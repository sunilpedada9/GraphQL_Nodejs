const mongoose=require('mongoose');
const uuid=require('uuid');
const Schema=mongoose.Schema;
const mongoosePaginate=require('mongoose-paginate-v2');

// User model
var User=new Schema({
    id:{
        type:String,
        require:true,
        default:()=>uuid.v4()
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    phone_number:{
        type:Number,
        require:true
    }
},{
    timestamps:true
}
);

User.plugin(mongoosePaginate);

module.exports=mongoose.model('User',User);
