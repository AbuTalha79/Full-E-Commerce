const express = require("express");
const { createCoupon, getAllCoupon, updateCoupon, deleteCoupon } = require("../CONTROLLER/couponController");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/",authMiddleWare,isAdmin, createCoupon) 
router.get("/get-all-coupon",authMiddleWare,isAdmin, getAllCoupon) 
router.put("/update-coupon/:id",authMiddleWare,isAdmin, updateCoupon) 
router.delete("/delete-coupon/:id",authMiddleWare,isAdmin, deleteCoupon) 


module.exports= router