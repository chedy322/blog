const post = require('../model/Post')
const multer = require('multer')

const fs=require('fs')
// to do fix the image laoding and fix the content and finish the rest
//to do add this storage later
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, './public')); // Save files in 'public/uploads'
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });
// const storage=multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'./public')

//     },
//     filename:function(req,file,cb){
//         // const {ext}=req.file
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null,file.fieldname+'-'+uniqueSuffix)

//     }
// })
// const upload=multer({storage:storage})
const upload = multer({dest:'./public'}).single('file')


// const Post=require('../model/Post')
// app.post('/create',upload.single('file'),async function(req,res){
//     console.log(req.body)
 
// })

//getting the users information 
//get
//update
//delete
//todo create add it here better

//get is done
//this for public
// to do finish this path and i need to add username in each post 
// i need to correct the paths so that home will get all the posts from get public 
// add profile to each path related to the user
// also move the down two public to another public  file without auth
// also add edit button and one click on the post it displays it
//to do style and css
//  all of this for user 
const getPosts=async (req,res)=>{
    //to do must gt the post based on req.user.id with createdbY
    //add it later
    // const{id:user_id}=req.user
    //createdBy:user_id
    // console.log(req.cookies)
    try{

        const Posts=await post.find({createdBy:req.user.id}).sort('-createdAt').limit(10)
        // console.log(Posts)
        // return res.send(`your posts are ${Posts}`)
        return res.json(Posts)
    }catch(err){
        next(err)
    }
}
//get post by id 
//is done
const getPostById=async (req,res)=>{
    //set same with created bY user 
   //chechk the id
//    console.log(req.params.id)
try{
    const {id}=req.params
    // const{id:user_id}=req.user
    const Post=await post.findOne({_id:id,createdBy:req.user.id})
    console.log(Post)
    // return res.send(`post is ${Post}`)
    return res.json(Post)

}catch(err){
    next(err)
}
    
}
//created is done
const create = (req, res) => {
    upload(req, res, async function(err) {
        try {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Failed to upload file" });
            }
            // check this
            const { originalname, path } = req.file;
            // console.log(req.file)
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1];
            const newPath = path + '.' + ext;

            // Rename the uploaded file to include the correct extension
            fs.renameSync(path, newPath);
            console.log(newPath)
            //til here

            // Access user ID from req.user
            const userId = req.user.id;
            // console.log(userId)

            // Create a new post object with required fields
            const newPost = {
                title: req.body.title,
                summary: req.body.summary,
                file: newPath,
                content:req.body.content,
                createdBy: userId,
                username:req.user.username
            };

            // Create the post in the database
            const createdPost = await post.create(newPost);

            // Send the created post as response
            res.status(201).json(createdPost);
        } catch (error) {
            console.log(error);
            next(err)
            res.status(500).json({ error: "Internal server error" });
        }
    });
};

//u^date by id 
//finish from here
const updatePost=(req,res)=>{
    upload(req,res,async function(err){
        if(err) throw err
        const{body:{title,summary,file,content},params:{id}}=req
    // if(!title||!summary||!content||!file){
    //     return res.send('please make some change')
    // }
    // for the file i have to add 
    const { originalname, path } = req.file;
    // console.log(req.file)
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;

    // Rename the uploaded file to include the correct extension
    fs.renameSync(path, newPath);
    const updates={
        title:req.body.title,
        content:req.body.content,
        summary:req.body.summary,
        //add filed
        file:newPath
    };
    const Post=await post.findByIdAndUpdate({_id:id,createdBy:req.user.id},updates,{new:true});
    console.log(Post)
    return res.json(Post)

    })
}

//delete by id 
const deletePost=async (req,res)=>{
    try{

        const{id}=req.params;
        const Post=await post.findByIdAndDelete({_id:id,createdBy:req.user.id})
        return res.send('deleted')
    }catch(err){
        next(err)
    }

}
const profile=(req,res)=>{
    
    return res.json(req.user.username)
}

module.exports={getPostById,getPosts,updatePost,create,deletePost,profile}