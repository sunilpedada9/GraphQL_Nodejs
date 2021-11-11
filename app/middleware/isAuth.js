const jwt=require('jsonwebtoken');
const {secretkey}=require('../config/auth.config')
module.exports=(req,res,next)=>{
    const authHeader=req.get('Authorization');
    if(!authHeader){
        req.isAuth=false;
        return next();
    }
    const token=authHeader.split(' ')[1]
    //console.log("auth",token)
    if(!token || token===''){
        req.isAuth=false;
        return next();
    }
    //console.log(authHeader)
    jwt.verify(token,secretkey,(err,decoded)=>{
        if(err){
            req.isAuth=false;
            return next();
            }
        req.isAuth=true;
        req.userID=decoded.userID;
        //console.log(req)
        return next();
    })
}