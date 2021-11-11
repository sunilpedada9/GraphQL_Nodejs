const dbConfig=require('../config/db.config');
const mongoose=require('mongoose');
const User=require('./user.model');
const PasswordReset=require('./passwordReset.model');

var db={};

db.url=dbConfig.url;
db.mongoose=mongoose;
db.User=User;
db.PasswordReset=PasswordReset;

module.exports=db;