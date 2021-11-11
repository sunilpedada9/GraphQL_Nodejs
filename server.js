require('dotenv').config();
const express=require('express');
const bodyParser=require('body-parser');
const expressGraphql=require('express-graphql').graphqlHTTP;
const schema=require('./app/graphql/schema');
const resolvers=require('./app/graphql/resolvers');
const authMiddleware=require('./app/middleware/isAuth');

// Configur environment variables
const PORT=process.env.PORT || 4000;
const db=require('./app/models/index');
const mongoose=db.mongoose;
const url=db.url;

// Create App
const app=express();


// Parser
app.use(bodyParser.json());

// Configur middleware
app.use(authMiddleware);

// Define GraphQL schema and resolvers
app.use('/conciergeAPI',expressGraphql({
    schema:schema,
    rootValue:resolvers,
    graphiql:true
}))

// Connect to database and start the server
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
                {
                useNewUrlParser:true
                })
    .then(async(connect)=>{
    app.listen(PORT,()=>{
        console.log(`Server started at port no :${PORT}`);
    })
    })
    .catch(err=>{
        console.log(`db connection error :${err.message}`);
    })