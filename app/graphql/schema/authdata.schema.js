var AuthData=`type AuthData{
    userID:ID!
    token:String!
    tokenExpiration:Int!
}`

var Link=` type Link{
    url:String!
}`

var PasswordInput=`input PasswordInput{
    password:String!
    public_id:String!
}`

var ChangePSWInput=`input ChangePSWInput{
    oldPassword:String!
    newPassword:String!
}`
var Message=`type Message{
    message:String!
}`
module.exports={AuthData,Link,PasswordInput,ChangePSWInput,Message};