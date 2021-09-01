const Blog = require('../models/blog');

exports.addBlog = async(req,res, next)=>{
    console.log("body", req.body)
    const { groupId,content} = req.body.data;
    try{
        const newBlog = new Blog({
            groupId,
            content
        })
        newBlog.save()
            .then(() => {
                return res.status(200).json({ "msg": "Blog is saved successfully!", "status": true });
            })
            .catch(err => {
                console.log(err)
                return res.status(400).json({"error": "INTERNAL_SERVER", "msg": "Error in Saving User", "status": false });
            })
    } catch (err) {
          res.status(500).send("Error in Saving");
      }
}
exports.getBlogs = async(req,res, next)=>{
    try{
    let blogs= await Blog.find({}).exec()
    if(!blogs){
        res.status(400).send("data not found")
    }else{
        res.status(200).json(blogs)
    }
      } catch (err) {
          res.status(500).send("Error in Fteching");
      }

}