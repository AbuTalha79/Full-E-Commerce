const mongoose = require("mongoose")

const validateMongoDbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error("Not a Valid Id or not exist")
}

module.exports=validateMongoDbId