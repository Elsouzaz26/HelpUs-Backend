const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    emailAddress: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    telePhone: {
        type: Number,
        required: true,
        trim:true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        trim:true
    },
    addressStreet:{
        type: String,
        required: true,
        trim:true
    },
    addressCity:{
        type: String,
        required: true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    img: { data: String, contentType: String },
    role: {
        type:String,
        required: true,
        trim: true
    },
    needsMedicalSupply:{
        type: Boolean,
        default:false
    },
    location: {
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    },
    needsFoodSupply: {
        type: Boolean,
        default:false
    },
    groupAdded:{
        type: Boolean  
    },
    deliveryStatus:{
        type:String
    },
    
}, { timestamps: true, versionKey: false });

userSchema.methods.comparePassword = function (candidatePassword, cb)  {
    
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        // console.log(isMatch)
        cb(null, isMatch);
    })
}


module.exports = mongoose.model('User', userSchema, 'user');

