const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    group:[ {
        type: Schema.Types.ObjectId,
        ref: 'group',
        required: true
    }],
    date: Date,
    city:String,
    status: String
}, { timestamps: true, versionKey: false });



module.exports = mongoose.model('Distribution', userSchema, 'distribution');

