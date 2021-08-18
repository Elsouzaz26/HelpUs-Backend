const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const emailExistence = require('email-existence');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const config = require('../config');
const user = require('../models/user');

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


    const { firstName, lastName, email, password, role } = req.body;

    emailExistence.check(email, function (err, response) {
        if (err) return res.status(400).json({"error": "INTERNAL_SERVER", "msg": "Error in Validate Email", "status": false })
        if (response === false) {
            return res.status(400).json({"error": "INVALID_EMAIL", "msg": "Please enter a valid Email address", "status": false })
        }


        User.findOne({$or: [
            {email: email},
            // {phone: phone}
        ]})
            .then(user => {
                if (user) {
                    return res.status(400).json({ "error": "USER_EXISTS", "msg": "User Already Exists!", "status": false })
                }

                bcrypt
                    .hash(password, 12)
                    .then(hashedPassword => {

                        const newUser = new User({
                            firstName,
                            lastName,
                            email,
                            password: hashedPassword,                            
                            role: role,
                            online: false
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


    const { email, password } = req.body;
   
    const re = new RegExp(
        "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])+"
    );
        let user
    if (re.test(email)) {
        user = await User.findOne({ email });
    }
    // } else {
    //     user = await User.findOne({ phone: +email });
    // }

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

        // let tokenDetails = await createToken(user);

        // do something with token

        // return res.status(200).json({ "msg": "User loggedin successfully!", "user": user,  accessToken,  refreshToken , "status": true })
        return res.status(200).json({ "msg": "User loggedin successfully!", "user": user })

    })


    
}

