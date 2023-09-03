const Brand = require ("../Model/brandModel")
const asyncHandler = require("express-async-handler")
const validateMongoDBid= require("../Utils/validateMongoDBid")

//create brand category
const createBrand = asyncHandler(async(req, res)=>{
   try {
       const newBrand = await Brand.create(req.body);
       res.json(newBrand)
   } catch (error) {
       throw new Error(error)
   }
});

//update brand category
const updateBrand = asyncHandler(async(req, res)=>{
   const {id} = req.params;
   validateMongoDBid(id);
   try {
       const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {new : true});
       res.json(updatedBrand)
   } catch (error) {
       throw new Error(error)
   }
});

//delete brand category
const deleteBrand = asyncHandler(async(req, res)=>{
   const {id} = req.params;
   validateMongoDBid(id);
   try {
       const deletedBrand = await Brand.findByIdAndDelete(id);
       res.json(deletedBrand)
   } catch (error) {
       throw new Error(error)
   }
});

 //get a brand category
 const getBrand = asyncHandler(async(req, res)=>{
   const {id} = req.params;
   validateMongoDBid(id);
   try {
       const getaBrand = await Brand.findById(id);
       res.json(getaBrand)
   } catch (error) {
       throw new Error(error)
   }
});

//get all brand category
const getAllBrand = asyncHandler(async(req, res)=>{
   try {
       const getAllBrand = await Brand.find();
       res.json(getAllBrand)
   } catch (error) {
       throw new Error(error)
   }
});
module.exports = {createBrand,updateBrand,deleteBrand,getBrand,getAllBrand }