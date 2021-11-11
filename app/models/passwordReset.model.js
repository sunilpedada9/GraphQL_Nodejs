const mongoose=require('mongoose');
const uuid=require('uuid');
const Schema=mongoose.Schema;

var schema=new Schema({
    id:{
        type:String,
        require:true,
        default:()=>uuid.v4()
    },
    public_id:{
        type:String,
        require:true
    },
    user_id:{
        type:String,
        require:true
    },
    expiry:{
        type:Date,
        require:true
    }
    },
    {timestamps:true}
    );

module.exports=mongoose.model('PasswordReset',schema);