// const mongoose=require('mongoose')
const post = require('../model/Post')
const mongoose=require('mongoose')
// to do finish this path and i need to add username in each post 
// i need to correct the paths so that home will get all the posts from get public 
// add profile to each path related to the user
//public ofr public and profule after each private one like home 
// also move the down two public to another public  file without auth
// also add edit button and one click on the post it displays it
const getPublic=async (req,res)=>{
   
        const Posts=await post.find({}).sort('-createdAt').limit(9)
        // const username=await user.find({_id:Posts})
        return res.json(Posts)
    
   

}
const getPublicById=async (req,res)=>{
    const{id}=req.params
    const Posts=await post.findOne({_id:id})
    return res.json(Posts)
}


module.exports={getPublic,getPublicById}