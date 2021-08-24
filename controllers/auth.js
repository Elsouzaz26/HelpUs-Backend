const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const emailExistence = require('email-existence');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const config = require('../config');
const user = require('../models/user');
var fs = require('fs');
var path = require('path');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.gmail,
        pass: config.gmailPassword
    }
});


function generateAccessToken(user) {
    return jwt.sign({ "id": user.id, "email": user.emal }, config.jwt_secret_key, { expiresIn: config.jwt_ExpiresIn })
}


async function mailer(recipient) {

    
    
        var mailOptions = {
            from: config.gmail,
            to: user.email,
            subject: 'Reset Password Bheeshma Grocery',
            text: `Your password reset code is ${token}`
        };

        return transporter.sendMail(mailOptions)

}


exports.Signup = async (req, res, next) => {
    console.log("body",req.body)

    // const { firstName, lastName, email, password, role } = req.body;
    const { emailAddress,telePhone,fullName,gender,addressStreet,addressCity,password, role,groupAssigned, img} = req.body;

    const image= {
        data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
        contentType: 'image/png'
    }

    emailExistence.check(emailAddress, function (err, response) {

        if (err) return res.status(400).json({"error": "INTERNAL_SERVER", "msg": "Error in Validate Email", "status": false })
        if (response === false) {
            return res.status(400).json({"error": "INVALID_EMAIL", "msg": "Please enter a valid Email address", "status": false })
        }


        User.findOne({
            emailAddress: emailAddress,
            // {phone: phone}
        })
            .then(user => {
                console.log("user",user)
                if (user) {
                    return res.status(400).json({ "error": "USER_EXISTS", "msg": "User Already Exists!", "status": false })
                }

                bcrypt
                    .hash(password, 12)
                    .then(hashedPassword => {

                        const newUser = new User({
                            emailAddress,
                            telePhone,
                            fullName,
                            gender,
                            addressStreet,
                            addressCity,
                            password:hashedPassword,
                            role,
                            img:image,
                            groupAssigned
                        })


                        newUser.save()
                            .then(() => {
                                return res.status(200).json({ "msg": "User is registered successfully!", "status": true });
                            })
                            .catch(err => {
                                console.log(err)
                                return res.status(400).json({"error": "INTERNAL_SERVER", "msg": "Error in Saving User", "status": false });
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        return res.status(400).json({"error": "INTERNAL_SERVER", "msg": err, "status": false });
                    })

            })
            .catch(err => {
                console.log(err);
                return res.status(400).json({ "msg": err, "status": false })
            })

    });

}

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
        return res.status(401).json({ "error": "INVALID_USER", "msg": "User not found!", 'status' : false })
    }

    user.comparePassword(password, async (err, isMatch) => {
        if (err) {
            return res.status(400).json({"error":"INTERNAL_SERVER", "msg": err, status: false })
        }

        if (!isMatch) {
            return res.status(400).json({ "error": "INVALID_PASSWORD", "msg": "User Password Do Not Matched!", "status": false })
        }
    
          
            const token = jwt.sign({ user },"myTokenSecret" );
              req.token = token;
              const newUser = {
                  token: req.token,
                  user: user,
                };
        
        return res.status(200).send(newUser)
   
    })
}

