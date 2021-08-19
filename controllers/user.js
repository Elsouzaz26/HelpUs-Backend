const User = require('../models/user');

exports.getUsers = async(req,res, next)=>{
      try{
      let users= await User.find({}).exec()
      if(!users){
          res.status(400).send("data not found")
      }else{
          res.status(200).json(users)
      }
        } catch (err) {
            res.status(500).send("Error in Fteching");
        }

}

exports.updateUser = async(req,res,next)=>{
    try{
        const foundUser = await User.findById(req.params.id);
        const user = await User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        telePhone: req.body.telePhone ? req.body.telePhone : foundUser.telePhone,
        fullName:req.body.fullName?req.body.fullName:foundUser.fullName,
        gender: req.body.gender ? req.body.gender : foundUser.gender,
        addressStreet: req.body.addressStreet ? req.body.addressStreet : foundUser.addressStreet,
        addressCity: req.body.addressCity ? req.body.addressCity : foundUser.addressCity,
        addressStreet: req.body.addressStreet ? req.body.addressStreet : foundUser.addressStreet,
      },
    }
  );
  res.send({user})
} catch (err) {
    res.status(500).send("Error in Fteching");
}
    
}