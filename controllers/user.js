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

  console.log(req.params)
  console.log(req.body)

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
        role: req.body.role ? req.body.role : foundUser.role,
        location: req.body.location ? req.body.location : foundUser.location,
        image: req.body.image ? req.body.image : foundUser.image,
        groupAdded: req.body.groupAdded ? req.body.groupAdded : foundUser.groupAdded,
        needsMedicalSupply: req.body.needsMedicalSupply, 
        needsFoodSupply: req.body.needsFoodSupply 
      },
    }
  );

  res.status(200).send({user})
} catch (err) {
    res.status(500).send("Error in Fteching");
}
    
}

exports.getByroles= async(req,res,next)=>{
  var data=req.query.data
  try{
     
        let users = await User.find({role:data}).sort([["updatedAt",-1]])
        res.json({users})
  }catch (err){
    res.status(500).send("Error in Fetching")
  }
}

exports.getByname= async(req,res,next)=>{
  var data=req.query.data
  try{
        let users = await User.find({fullName:data});
        console.log(users)
        res.status(200).json({users})
  }catch (err){
    res.status(500).send("Error in Fetching")
  }
}

exports.getByCity = async(req,res,next)=>{
  var city=req.query.city
  var role = req.query.role

  console.log(req.query)
  try{
        let users = await User.find({addressCity:city, role: role});
        console.log(users)
        res.status(200).json({users})
  }catch (err){
    res.status(500).send("Error in Fetching")
  }
}

exports.updateSeniorstatus = async(req,res,next)=>{
  console.log(req.body)

  const user = await User.updateOne(
    { _id: req.body.id },
    {
      $set: {
        deliveryStatus:req.body.data
      },
    }
  );
  res.status(200).json({
    user:user,
    msg:"updated"})
  // console.log(req.query)
  // try{
  //       let users = await User.find({addressCity:city, role: role});
  //       console.log(users)
  //       res.status(200).json({users})
  // }catch (err){
  //   res.status(500).send("Error in Fetching")
  // }
}