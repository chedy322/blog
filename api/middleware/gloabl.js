const globalerr=(err,req,res,next)=>{
    // err.statusCode=err.statusCode||500;
    console.log(err)
    res.status(500).send('something wrong')
    

}


module.exports=globalerr;