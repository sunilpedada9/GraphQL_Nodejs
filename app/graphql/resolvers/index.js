const userResolver=require('./user.resolver');
const authResolver=require('./auth.resolver');

module.exports={
    createUser:userResolver.createUser,
    login:authResolver.login,
    forgetPassword:authResolver.forgetPassword,
    resetPassword:authResolver.resetPassword,
    userList:userResolver.userList,
    changePassword:authResolver.changePassword,
    userView:userResolver.userView,
    userUpdate:userResolver.userView
}