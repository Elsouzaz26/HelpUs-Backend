const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({

    city: {
        type: String
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    senior: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date: Date,
    centroid: [
        {
            type: Number
        },
        {
            type: Number 
        }
    ],
    status: {
        type: String
    }
}, { timestamps: true, versionKey: false });
module.exports = mongoose.model("Group", GroupSchema, 'group');