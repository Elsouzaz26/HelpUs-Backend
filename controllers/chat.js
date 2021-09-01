const Chat = require('../models/chat');

exports.getChats = async(req,res, next)=>{
    try{
    let chats= await Chat.find({}).sort([["createdAt",-1]]).populate('user1').populate('user2').exec()
    if(!chats){
        res.status(400).send("data not found")
    }else{
        res.status(200).json(chats)
    }
      } catch (err) {
          res.status(500).send("Error in Fteching");
      }

}