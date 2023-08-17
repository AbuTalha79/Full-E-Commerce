const express = require('express')
const { createUser, loginUser, handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword } = require('../CONTROLLER/Auth')
const { authMiddleWare } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post("/registerUser",createUser)
router.post("/forgot-pass-token",forgotPasswordToken)
router.put("/reset-password/:token",resetPassword)
router.post("/loginUser",loginUser)
router.post("/password",authMiddleWare,updatePassword)
router.get("/refreshtoken",handleRefreshToken)
router.get("/logout",logout)



module.exports=router