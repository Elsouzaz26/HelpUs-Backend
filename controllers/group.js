const Group = require('../models/group');

exports.addGroup = async(req,res, next)=>{
    console.log("body", req.body)
    const { groupName,city,leader,typeOfGroupDelivery,dateAssigned,status} = req.body;
    try{
        const newGroup = new Group({
            groupName,
            city,
            leader,
            typeOfGroupDelivery,
            dateAssigned,
            status
        })
        newGroup.save()
            .then(() => {
                return res.status(200).json({ "msg": "User is registered successfully!", "status": true });
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({"error": "INTERNAL_SERVER", "msg": "Error in Saving User", "status": false });
            })
    } catch (err) {
          res.status(500).send("Error in Saving");
      }
}
exports.getGroups = async(req,res, next)=>{
    try{
    let groups= await Group.find({}).exec()
    if(!groups){
        res.status(400).send("data not found")
    }else{
        res.status(200).json(groups)
    }
      } catch (err) {
          res.status(500).send("Error in Fteching");
      }

}

exports.updateGroup = async(req,res,next)=>{
  try{
      const foundGroup = await Group.findById(req.params.id);
      const group = await Group.updateOne(
  { _id: req.params.id },
  {
    $set: {
      groupName: req.body.groupName ? req.body.groupName : foundGroup.groupName,
      city:req.body.city?req.body.city:foundGroup.city,
      leader: req.body.leader ? req.body.leader : foundGroup.leader,
      typeOfGroupDelivery: req.body.typeOfGroupDelivery ? req.body.typeOfGroupDelivery : foundGroup.typeOfGroupDelivery,
      status: req.body.status ? req.body.status : foundGroup.status,
    },
  }
);
res.send({group})
} catch (err) {
  res.status(500).send("Error in Updating");
}
  
}
