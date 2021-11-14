const express=require('express');
const dotenv = require('dotenv').config({ path: './config/config.env'});
const bodyParser = require('body-parser');
const DBconnection=require('./db-connection/connect-mysql');
const userRouter = require('./routers/userRoute');




const app=express();
app.use(express.json());
// Connect to DB

//start User Router:
app.use('/api/v1/users',userRouter);

const port= process.env.PORT||5000;

app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
});