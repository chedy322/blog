const express=require('express');
const app=express();
const cors=require('cors')
const connectdb=require('./db/connect')
require('dotenv').config()
const cookie=require('cookie-parser');
// const multer= require('multer')
//delete this later only for testing purpose
// const {profile,create}=require('./controllers/main')
const authorize=require('./middleware/auth')
//delete and edit this code later only for testing
const post=require('./model/Post')
const mongoose=require('mongoose')
const path=require('path')
// app.use(cook)
// ('chedy',{
//     httpOnly:true,
//     secure:true
// })
app.use(cookie())
//need to know how the static work
app.use('/public',express.static(path.join(__dirname+'/public'))); 
//multer

// const upload = multer({ dest:'./public'})

// const upload = multer({ dest: './public/data/uploads/'} )
const port=process.env.PORT||3002;


// middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests 
    credentials: true // Allow credentials (cookies, authorization headers)
  }));
app.options('*', cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname,'/public')))

//routes
app.use(require('./middleware/gloabl'))
app.use('/auth',require('./routes/auth'))
// app.use('/profile',require('./routes/profile'))
// add authorize later
app.use('/public',require('./routes/profile'))
app.use(authorize,require('./routes/main'))

//testing route for multer

//uploading the image as file
//change the file name in the storage 
//change create to post later and edit it in react
app.all('*',(req,res,next)=>{
    return res.send("route doesn't exist")

})


const start=async()=>{
    try{
        await connectdb(process.env.URL)
        
        app.listen(port,()=>{
            console.log(`listening on port ${port}`)
        })

    }catch(err){
        console.log(err)
    }
}
start()
