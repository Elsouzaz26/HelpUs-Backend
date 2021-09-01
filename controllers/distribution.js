const Dist = require('../models/distribution');
const Group = require("../models/group");
const User = require("../models/user");

exports.saveDistribution = async(req,res, next)=>{
    console.log("body distribution",req.body.data)
    const data = req.body.data

    for(let i=0; i< data.group.length ; i++) {
        Group.findByIdAndUpdate(data.group[i]._id, {
            leader: data.group[i].leader
        }).then(res => {
            console.log(res)

                User.findByIdAndUpdate(data.group[i].leader, {
                    groupAdded: true
                }).then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
            
        }).catch(err => {
            console.log(err)
        })
    }
        let group= data.group.map(item => item._id)

        new Dist({
            group: group,
            city: data.city,
            status: "To do",
            date:  data.date
        }).save().then(response => {
            console.log(response)
            return res.status(200).send(response)
        }).catch(err => {
            console.log(err)
            return res.status(500).send("Error in saving distribution")

        })


}


exports.getDistribution = (req,res,next ) => {
    Dist.find()
    .then(response => {
        return res.status(200).send(response)
    }).catch(err => {
        return res.status(500).send("Error in getting distribution")
    })
}

exports.renewDistribution = (req,res,next ) => {
    Dist.findByIdAndUpdate(req.body.data.id, {
        date: req.body.data.date,
        status: "To do"
    }).then(response => {
        return res.status(200).send(response)

    }).catch(err => {
        return res.status(500).send("Error in renew distribution")
        
    })
}

