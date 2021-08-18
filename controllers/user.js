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
        firstName: req.body.firstName ? req.body.firstName : foundUser.firstName,
        lastName:req.body.lastName?req.body.lastName:foundUser.lastName,
        email: req.body.email ? req.body.email : foundUser.email,
        role: req.body.role ? req.body.role : foundUser.role,
        password: req.body.password ? req.body.password : foundUser.password,
      },
    }
  );
  res.send({user})
} catch (err) {
    res.status(500).send("Error in Fteching");
}
    
}