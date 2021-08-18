const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true,
        trim:true
    },
    lastName: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type:String,
        required: true,
        trim: true
    },
    online: {
        type: Boolean
    }
    
}, { timestamps: true, versionKey: false });

userSchema.methods.comparePassword = function (candidatePassword, cb)  {
    
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        // console.log(isMatch)
        cb(null, isMatch);
    })
}


module.exports = mongoose.model('User', userSchema, 'user');

