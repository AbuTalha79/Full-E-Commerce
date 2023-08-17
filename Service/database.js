const mongoose = require("mongoose")

const connectDB=async()=>{
    mongoose.connect(process.env.MONGO_URL,{

    }).then(()=>{
        console.log("Database Connected");
    }).catch((error)=>{
        console.log("Database not connected" +error);
    })
}
module.exports=connectDB