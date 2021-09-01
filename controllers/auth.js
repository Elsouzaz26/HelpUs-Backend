const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const emailExistence = require("email-existence");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const config = require("../config");
const Chat = require("../models/chat");
var fs = require("fs");
var path = require("path");

function generateAccessToken(user) {
  return jwt.sign(
    { data: { id: user._id, email: user.emailAddress, role: user.role } },
    config.jwt_secret_key,
    { expiresIn: config.jwt_ExpiresIn }
  );
}

exports.Signup = async (req, res, next) => {
  console.log("body", req.body);

  // const { firstName, lastName, email, password, role } = req.body;
  const {
    emailAddress,
    telePhone,
    fullName,
    gender,
    addressStreet,
    addressCity,
    password,
    role,
    needsMedicalSupply,
    needsFoodSupply,
    groupAdded,
    lat,
    lng,
    img,
  } = req.body;
  const location = {
    lat: lat,
    lng: lng,
  };
  if (req.file) {
    var image = {
      data: "./uploads/" + req.file.filename,
      contentType: "image/png",
    };
  } else {
    var image = {};
  }

//   emailExistence.check(emailAddress, async (err, response) => {
//     if (err)
//       return res
//         .status(400)
//         .json({
//           error: "INTERNAL_SERVER",
//           msg: "Error in Validate Email",
//           status: false,
//         });
//     if (response === false) {
//       return res
//         .status(400)
//         .json({
//           error: "INVALID_EMAIL",
//           msg: "Please enter a valid Email address",
//           status: false,
//         });
//     }

    User.findOne({
      emailAddress: emailAddress,
      // {phone: phone}
    })
      .then((user) => {
        console.log("user", user);
        if (user) {
          return res
            .status(400)
            .json({
              error: "USER_EXISTS",
              msg: "User Already Exists!",
              status: false,
            });
        }

        bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            const newUser = new User({
              emailAddress,
              telePhone,
              fullName,
              gender,
              addressStreet,
              addressCity,
              needsMedicalSupply,
              needsFoodSupply,
              password: hashedPassword,
              role,
              location: location,
              img: image,
              groupAdded,
            });

            
            newUser
              .save()
              .then(() => {

                if (role == "volenteer") {
                  Chat.findOne({ user2: newUser._id }).then((chat) => {
                    if (chat) {
                      return res
                        .status(400)
                        .json({
                          error: "USER_EXISTS",
                          msg: "Chat Already Exists!",
                          status: false,
                        });
                    }
                   
                    User.findOne({ role: "manager" }).then((manager) => {
                      const newChat = new Chat({
                        user1: manager._id,
                        user2: newUser._id,
                        active: true,
                      });
                      newChat.save();
                    });
    
                  });
                }

                
                
                return res
                  .status(200)
                  .json({
                    msg: "User is registered successfully!",
                    status: true,
                  });
              })
              .catch((err) => {
                console.log(err);
                return res
                  .status(400)
                  .json({
                    error: "INTERNAL_SERVER",
                    msg: "Error in Saving User",
                    status: false,
                  });
              });
          })
          .catch((err) => {
            console.log(err);
            return res
              .status(400)
              .json({ error: "INTERNAL_SERVER", msg: err, status: false });
          });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ msg: err, status: false });
      });
  ;
};

exports.Signin = async (req, res, next) => {
  const { emailAddress, password } = req.body;

  const re = new RegExp(
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+"
  );
  let user;
  if (re.test(emailAddress)) {
    user = await User.findOne({ emailAddress });
  }

  if (!user) {
    return res
      .status(401)
      .json({ error: "INVALID_USER", msg: "User not found!", status: false });
  }

  user.comparePassword(password, async (err, isMatch) => {
    if (err) {
      return res
        .status(400)
        .json({ error: "INTERNAL_SERVER", msg: err, status: false });
    }

    if (!isMatch) {
      return res
        .status(400)
        .send({
          error: "INVALID_PASSWORD",
          msg: "User Password Do Not Matched!",
          status: false,
        });
    }

    // const token = jwt.sign({email:user.emailAddress,password:user.password },"myTokenSecret", {expiresIn: "30d"});
    // req.token = token;

    const token = await generateAccessToken(user);
    const response = {
      token: token,
      user: user,
      status: 200,
    };

    return res.status(200).json(response);
  });
};

exports.Verify = async (req, res, next) => {
  const token = req.header("Authorization");
  let array = token.split(" ");
  const newToken = array[1];

  console.log(token)
  if (!newToken) return res.status(401).send({ message: "Access Denied" , status: 401});
  try {
    const decoded = jwt.verify(newToken, config.jwt_secret_key);
    let user = await User.findOne({ emailAddress: decoded.data.email });
    return res.status(200).json({
      user,
      message: "verified",
      status: 200
    });
  } catch (error) {
    res.send({ message: "Invalid Token", status: 401 });
  }
};
