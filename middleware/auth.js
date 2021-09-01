const jwt = require('jsonwebtoken')
const User = require ("../models/user")
const config = require("../config")

module.exports.auth = async(req,res,next) => {
    const token = req.header("Authorization");
    console.log(token)
    let array = token.split(" ");
    
    const newToken = array[1];

    console.log(newToken)
    if (newToken == null) {
        console.log("*****")
        console.log(newToken)
        return res.status(401).send({ message: "Access Denied" , status: 401});
    } 
    
    try {
        const decoded = jwt.verify(newToken, config.jwt_secret_key);
        let user = await User.findOne({ emailAddress: decoded.data.email });
        req.user = user
        next()

       
    } catch (error) {
        console.log(error)
        return res.status(401).send({ message: "Access Denied" , status: 401});

    }
    
}