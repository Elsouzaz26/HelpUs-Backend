const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lastMsg: {
        type: String,
        trim: true
    },
    unreadMsgCount: {
        type: Number,
        trim: true
    },
    active : { 
        type : Boolean,
        default:false
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model("Chat", chatSchema, 'chats');
