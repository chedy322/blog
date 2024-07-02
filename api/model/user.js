const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide your name'],
        minlength:[2,"Please name should 2 characters at least"]


       
    },
    email:{
        type:String,
        required:[true,'Please provide your email'],
        minlength:[5,"Please provide true email"],
        unique:[true,'this email already exists']
    },
    password:{
        type:String,
        required:[true,'Please provide your password'],
        minlength:[5,"Please password should 5 characters at least"]
    }

})
UserSchema.pre('save',async function() {
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
});

UserSchema.methods.createJWT = function () {
    const token = jwt.sign({
        id: this._id, 
        username: this.name 
    }, process.env.SECRET, { expiresIn: '30d' });
    return token;
};

UserSchema.methods.ComparePassword=async function(user_input){
    const match=await bcrypt.compare(user_input,this.password)
    return match
};

module.exports=mongoose.model('Usermodel',UserSchema)