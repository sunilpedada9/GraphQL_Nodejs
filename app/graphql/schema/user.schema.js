var User=`type User{
            id:ID!,
            name:String!
            email:String!
            password:String
            phone_number:Int!
        }`

var UserInput=`input UserInput{
        name:String!
        email:String!
        password:String!
        phone_number:Int!
        } `

var UserLoginInput=`input UserLoginInput{
        email:String!
        password:String!
        }`

var Pagination=`type Pagination{
        totalDocs:Int!
        offset:Int!
        limit:Int!
        totalPages:Int
        page:Int
        pagingCounter:Int
        hasPrevPage:Boolean
        hasNextPage:Boolean
        prevPage:Int
        nextPage:Int
        docs:[User!]!
}`

var UserUPDInput=`input UserUPDInput{
        name:String
        email:String
        phone_number:Int
}`

module.exports={User,UserInput,UserLoginInput,Pagination,UserUPDInput};