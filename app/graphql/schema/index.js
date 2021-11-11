const {buildSchema}=require('graphql');
const userSchema=require('./user.schema');
const authSchema=require('./authdata.schema');

module.exports=buildSchema(`
    ${userSchema.User}
    ${authSchema.AuthData}
    ${authSchema.Link}
    ${userSchema.UserInput}
    ${userSchema.UserLoginInput}
    ${authSchema.PasswordInput}
    ${authSchema.ChangePSWInput}
    ${authSchema.Message}
    ${userSchema.Pagination}
    ${userSchema.UserUPDInput}
    type RootQuery{
        login(userLogin:UserLoginInput):AuthData!
        userList(limit:Int,page:Int):Pagination!
        userView:User!
    }
    type RootMutation{
        createUser(userInput:UserInput):User!
        forgetPassword(email:String!):Link!
        resetPassword(passwordInput:PasswordInput):User!
        changePassword(changePSWInput:ChangePSWInput):Message!
        userUpdate(userInput:UserUPDInput!):User!
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`);