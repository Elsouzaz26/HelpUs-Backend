const Message = require('../models/messages');

exports.getMessages = async(req,res, next)=>{
    const  chatId=req.params.id
    const skip = req.params.skip
    console.log(chatId)
    console.log(req.params)
    try{
   
    let message= await Message.find({chat:chatId}).sort([["createdAt",-1]]).skip(+skip).limit(10).populate('chat').populate('to').populate('from').exec()
    
    if(!message){
        res.status(400).send("data not found")
    }else{
        res.status(200).json(message.reverse())
    }
      } catch (err) {
          res.status(500).send("Error in Fteching");
      }

}