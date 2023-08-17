const User = require("../Model/userModel")
const asyncHandler = require("express-async-handler")
const validateMongoDbId = require("../Utils/validateMongoDBid")




//get ALL user
const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getAllUsers = await User.find()
        res.status(200).json({ getAllUsers })
    } catch (error) {
        throw new Error(error)
    }

})


//get a user
const getaUser = asyncHandler(async (req, res) => {

    const { id } = req.user;
    validateMongoDbId(id);
    try {
        const getUser = await User.findById(id);
        res.status(200).json({ getUser })
    } catch (error) {
        res.status(403).json({ message: "User not found..." })
    }
});

//update a user
const updateaUser = asyncHandler(async (req, res) => {
    // console.log(req.params);
    const { id } = req.user

    validateMongoDbId(id);
    try {
        const updateaUser = await User.findByIdAndUpdate(id,
            {
                firstname: req?.body?.firstname,
                lastname: req?.body?.lastname,
                email: req?.body?.email,
                mobile: req?.body?.mobile
            },
            {
                new: true
            }
        );
        res.status(200).json({ message: "Updated successfully", updateaUser })

    } catch (error) {
        throw new Error(error)
    }
})

//delete a user
const deleteaUser = asyncHandler(async (req, res) => {
    console.log(req.params);
    const { id } = req.user;
    validateMongoDbId(id);
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.status(200).json({ deleteaUser })
    } catch (error) {
        res.status(403).json({ message: "User not found..." })
    }
});

//block a user
const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const block = await User.findByIdAndUpdate(id,
            {
                isBlocked: true
            },
            {
                new: true
            },
        )
        res.json({message:"User Blocked",block});
    } catch (error) {
        throw new Error(error)
    }
})

//unblock a user
const unBlockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(id,
            {
                isBlocked: false
            },
            {
                new: true
            },
        )
        res.json({message:"User UnBlocked",unblock});
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { getAllUser, getaUser, deleteaUser, updateaUser, blockUser, unBlockUser }