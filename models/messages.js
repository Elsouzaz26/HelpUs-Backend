const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        reuired: true,
        trim: true
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model("Messages", messageSchema, 'messages');
