const mongoose=require('mongoose');
//to do adding more options in here like length and required fields
const Post=new mongoose.Schema({
    title:String,
    summary:String,
    file:String,
    content:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    username:{
      type:String
    }
  }, {
    timestamps: true,

})



module.exports=mongoose.model('Post',Post)