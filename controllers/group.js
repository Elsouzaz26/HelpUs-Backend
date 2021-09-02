const Group = require('../models/group');
const kmeans = require('node-kmeans');

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

exports.kMean = async(req,res, next)=>{
    console.log("body",req.body)

    let data = req.body.data.senior;

    const  ids = data.map(d => {
        return  d._id
    })
    console.log(ids)
    let vectors = new Array();
    for (let i = 0 ; i < data.length ; i++) {
        vectors[i] = [ data[i]['location'].lat , data[i]['location'].lng];
    }

    kmeans.clusterize(vectors, {k: req.body.data.kValue}, async(err,response) => {
        if (err) {
            return res.status(400).send(err)
        }
        else {
            let group=[]
            for( let i=0; i<req.body.data.kValue;i++){
             let newGroup= await new Group({
                city: req.body.data.city,
                senior: ids,
                date: req.body.data.date.split("T")[0],
                status: "To do",
                centroid: [response[i].centroid[0] + Math.floor(Math.random() * 10)* 0.00005, response[i].centroid[1] + Math.floor(Math.random() * 10)* 0.00005 ] 
            })
            await newGroup.save()
            group.push(newGroup);
           
        }
            res.status(200).json({
                group:group,
                msg:"group is created"
            })
        }
      });
}

exports.updateGroup = async(req,res,next)=>{

    console.log(req.body)
  try{
      const foundGroup = await Group.findById(req.params.id);
      console.log(foundGroup)
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

console.log(group)
res.send({group})
} catch (err) {
    console.log(err)
  res.status(500).send("Error in Updating");
}
  
}


exports.getGroupByCityAndDate = (req,res,next) => {
    let date = req.body.date.split("T")[0]

    Group.find({city: {$in:  req.body.city} , createdAt: {$gte: date}}).then(response => {
        res.status(200).send(response)
    }).catch(err => {
        console.log(err)
            res.status(500).send("Error in geeting result");
        
    })
}

exports.getSeniorBygroupId = async(req,res,next) => {
    console.log("req",req.query)
    const foundGroup = await Group.findById(req.query.id).populate("senior");
    res.status(200).json({
        data:foundGroup,
        msg:"data found"
    })
}