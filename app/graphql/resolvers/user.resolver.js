const db=require('../../models/index');
const bcrypt=require('bcryptjs');
const {paginatTION, pagination}=require('../../helpers/pagination');
const { mapReduce } = require('../../models/user.model');
const User=db.User;

var createUser=async(args)=>{
    return await User.findOne({email:args.userInput.email}).then(
        async(user)=>{
            if(user){
                throw new Error('User is already exist!.');
            }
            return await bcrypt.hash(args.userInput.password,12)
    .then(async(password)=>{
        var userInput=User({
        name:args.userInput.name,
        email:args.userInput.email,
        password:password,
        phone_number:args.userInput.phone_number
    });
    return await userInput.save()
        .then(async(result)=>{
            console.log(result)
           return {...result._doc,password:null};
        })
        })
        }
    )
    .catch(async(err)=>{
        throw err;
    })
}

var userList=async(args,req)=>{
    console.log(req.isAuth)
    if(!req.isAuth){
        throw new Error('UnAuthenticated!');
    }
    var {limit,offset}=pagination(args.page,args.limit);
    return await User.paginate({offset,limit})
        .then(async(users)=>{
            //console.log(users)
            console.log({...users,docs:users.docs.map(user=>{return {...user._doc,password:null}})});
            return {...users,docs:users.docs.map(user=>{return {...user._doc,password:null}})}
        })
        .catch(err=>{
            throw new Error(`Error occurred : ${err.message}`)
        })
}

var userView=async(args,req)=>{
    if(!req.isAuth){
        throw new Error('UnAuthenticated!');
    }
    else if(!args.userInput){
                return await User.findOne({id:req.userID})
                    .then(async(user)=>{
                    //console.log(user._doc)
                        return {...user._doc,password:null};
                    })
                    .catch(err=>{
                        throw new Error(`Cannot get user details error:${err.message}!`);
                    })
    }

    return await User.updateOne({id:req.userID},{
        name:args.userInput.name,
        email:args.userInput.email,
        phone_number:args.userInput.phone_number
    })
    .then(async(user)=>{
        if(!user.modifiedCount){
            throw new Error(`Can't update!`)
        }
        return await User.findOne({id:req.userID})
                    .then(async(user)=>{
                    //console.log(user._doc)
                        return {...user._doc,password:null};
                    })
    })
    .catch(err=>{
        throw new Error(`Cannot get user details error:${err.message}!`);
    })
}

module.exports={createUser,userList,userView};