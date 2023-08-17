const express = require('express');
const connectDB = require('./Service/database');
require("dotenv").config();
const app = express();
const cookieparser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan")

//error handler
const errorHandler =require("./middlewares/Error_Handler");
const notFound = require("./middlewares/Not_Found");


//router functionality
const authRouter = require('./routers/authRouters');
const userRouters= require('./routers/userRouter');
const productRouter = require("./routers/productRoute");
const blogRouter = require("./routers/blogRouter");

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieparser());
app.use(morgan("tiny"))
app.use("/api/v1/users",authRouter);
app.use("/api/v1/users",userRouters);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/blog", blogRouter);


app.get("/",(req, res)=>{
    res.send("Working Fine....");
});


app.use(errorHandler);
app.use(notFound);


const port = process.env.PORT ||4000

const start = async() =>{
    try {
        connectDB()
       await app.listen(port,()=>{
        console.log(`server is running on port : ${port}`);
       })
    } catch (error) {
        console.log("oops...Server error");
    }
}

start();







