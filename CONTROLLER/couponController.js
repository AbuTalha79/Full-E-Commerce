const Coupon = require("../Model/couponModel")
const validateMongoDbId = require("../Utils/validateMongoDBid")
const asyncHandler = require("express-async-handler")

const createCoupon = asyncHandler(async(req,res) => {
    
    try {
        const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon)
    } catch (error) {
        throw new Error(error)
    }
});

//get all coupon
const getAllCoupon = asyncHandler(async(req,res) => {
    
    try {
        const coupons = await Coupon.find();
    res.json(coupons)
    } catch (error) {
        throw new Error(error)
    }
});

//update a coupon
const updateCoupon = asyncHandler(async(req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const updatecoupons = await Coupon.findByIdAndUpdate(id, req.body, { new: true});
    res.json(updatecoupons)
    } catch (error) {
        throw new Error(error)
    }
});

//delete a coupon
const deleteCoupon = asyncHandler(async(req,res) => {
    const {id} = req.params;
    validateMongoDbId(id);
    try {
        const deletecoupons = await Coupon.findByIdAndDelete(id);
    res.json(deletecoupons)
    } catch (error) {
        throw new Error(error)
    }
});


module.exports= {createCoupon, getAllCoupon, updateCoupon, deleteCoupon}