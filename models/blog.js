const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    groupId:{
        type: Schema.Types.ObjectId,
        ref: 'group',
        required: true
    },
    content:{
        type:String
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model("Blog", chatSchema, 'blog');