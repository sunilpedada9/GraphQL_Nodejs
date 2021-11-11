const db=require('../../models/index');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {secretkey}=require('../../config/auth.config');
const {rendomString}=require('../../helpers/crypto.helper');
const PasswordReset=db.PasswordReset;
const User=db.User;

// User signIn
var login=async(args)=>{
    console.log("in ligin")
    var user=await User.findOne({email:args.userLogin.email})
    if(!user){
        throw new Error("User not exist!");
        }
    var isValid= await bcrypt.compare(args.userLogin.password,user.password);
    if(!isValid){
        throw new Error('Password is invalid!.')
    }
    var token= await jwt.sign({email:user.email,userID:user.id },secretkey,{
        expiresIn:'1h'
    });
    return {
        userID:user.id,
        token:token,
        tokenExpiration:1
    }

}

// User forget password
var forgetPassword=async(args)=>{
    if(!args.email){
        throw new Error("Email is required!");
    }

    // Generate a randum id
    var resetval=await User.findOne({email:args.email})
                    .then(async(user)=>{
                        if(!user){
                            throw new Error("User doesn't exist!");
                        }
                    return await PasswordReset.create({
                            public_id:rendomString(10),
                            user_id:user.id,
                            expiry:Date.now()+1800000
                            })
                            .then(async(reset)=>{
                                    return reset;
                                })
                    })
                    .catch(err=>{
                        throw new Error(`Can't reset password due to:${err.message}!`)
                    })
    
    // Send id to email
    // To test sending url
    return{url:`http://${process.env.SERVER_HOST}:${process.env.PORT}/${resetval.public_id}`};
};

var resetPassword=async(args)=>{
    if(!args.passwordInput.password || !args.passwordInput.public_id){
        throw new Error('Please enter new password!.')
    }
    var userData=await PasswordReset.findOne({public_id:args.passwordInput.public_id,expiry:{$gte:Date.now()}})
                .then(async(keydata)=>{
                    if(!keydata._doc){
                        throw new Error(`Can't reset password!`)
                    }
                    var password=await bcrypt.hash(args.passwordInput.password,12)
                    return await User.findOneAndUpdate({id:keydata._doc.user_id},{password:password})
                                .then(async(user)=>{
                                    if(!user._doc){
                                        throw new Error(`User not exist!`)
                                    }
                                    await PasswordReset.deleteOne({
                                        public_id:args.passwordInput.public_id,
                                        user_id:user._doc.id
                                    })
                                    return {...user._doc,password:null};
                                })
                })
                .catch(err=>{
                    throw new Error(`Can't rest password error:${err.message}`)
                })
    return userData;
}

var changePassword=async(args,req)=>{
    if(!req.isAuth){
        throw new Error('UnAuthenticated!')
    }
    else if(!args.changePSWInput.oldPassword || !args.changePSWInput.newPassword){
        throw new Error('Please provide old and new password!')
    }
    console.log("return")
    return await User.findOne({id:req.userID})
        .then(async(user)=>{
            var valied=await bcrypt.compare(args.changePSWInput.oldPassword,user.password)
            if(!valied){
                throw new Error("Please enter correct old password!")
            }
            var password=await bcrypt.hash(args.changePSWInput.newPassword,12)
            var userData= await User.updateOne({id:user.id},{password:password})
            console.log(userData)
            if(!userData.modifiedCount){
                throw new Error(`Can't change password!`)
            }
            return {message:`you've changed password successfully!`}
        })
        .catch(err=>{
            throw new Error(`Can't change the password error:${err.message}!`)
        })
}

module.exports={login,forgetPassword,resetPassword,changePassword};