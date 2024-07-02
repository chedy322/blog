const Usermodel=require('../model/user')


const register=async (req,res)=>{
    //need to handle this better
    try{
        const existingUser = await Usermodel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user=await Usermodel.create({...req.body})
        const token=user.createJWT()
        res.json({user,token});
    }
    catch(err){
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'Registration failed', error: err.message });
        next(err); // Pass the error to the next middleware (if any)
    }
}



// const login=async (req,res)=>{
//     try{
//         const {email,password}=req.body;
//         if(!password||!email){
//             return res.send('please fill the form')
//         }
//         const user=await Usermodel.findOne({email})
//         if(!user){
//             return res.status(204).send('no such user')
//         }
//         const match=await user.ComparePassword(password)
//         if(!match){
//             return  res.send("invalid email or password")
//         }
//         const token=user.createJWT();
//         res.cookie('token',token).json({username:user.username,id:user._id})
//     }catch(err){
//         res.status(400).json('wrong credentials');
//     }


// }
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!password || !email) {
            return res.status(400).send('Please provide both email and password');
        }
        
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        
        const match = await user.ComparePassword(password);
        if (!match) {
            return res.status(401).send('Invalid email or password');
        }
        
        const token = user.createJWT();
        //add it later for the cookie , { httpOnly: true, secure: true }
        res.cookie('token', token,{ httpOnly: true, secure: true }).json({ username: user.name, id: user._id,token_exp:token });
    } catch (err) {
        console.error(err);
        // res.status(500).send('An error occurred while processing your request');
        next(err)
    }
};

const logout=(req,res)=>{
    return res.cookie('token','').json('ok')

}



module.exports={login,register,logout};