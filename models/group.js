const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
groupName:{
    type:String
    },
city:{
        type:String
 },
leader:{ 
    type: mongoose.Schema.Types.ObjectId, 
    required: true, 
    ref: 'User' 
},
typeOfGroupDelivery :{
    type:String
},
dateAssigned:{
    type: Date, 
    default: Date.now,
},
status:{
    type:String
}
},{ timestamps: true, versionKey: false });
module.exports = mongoose.model("group", GroupSchema);