const express = require("express");
const { getAllUser, getaUser, deleteaUser, updateaUser, unBlockUser, blockUser } = require("../CONTROLLER/userController");
const router = express.Router();
const {  handleRefreshToken } = require("../CONTROLLER/Auth");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleware");

router.get("/getAllUser",getAllUser)
router.get("/getaUser/:id",authMiddleWare,isAdmin,getaUser)
router.delete("/deleteaUser/:id",deleteaUser)
router.put("/updateaUser/edit-user",authMiddleWare,updateaUser)
router.put("/updateaUser/block-user/:id",authMiddleWare,isAdmin ,blockUser)
router.put("/updateaUser/unblock-user/:id",authMiddleWare,isAdmin,unBlockUser)





module.exports = router