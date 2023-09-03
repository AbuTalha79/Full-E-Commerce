 const Category = require ("../Model/procategoryModel")
 const asyncHandler = require("express-async-handler")
 const validateMongoDBid= require("../Utils/validateMongoDBid")

 //create category
 const createCategory = asyncHandler(async(req, res)=>{
    try {
        const newCategory = await Category.create(req.body);
        res.json(newCategory)
    } catch (error) {
        throw new Error(error)
    }
 });

 //update category
 const updateCategory = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    validateMongoDBid(id);
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {new : true});
        res.json(updatedCategory)
    } catch (error) {
        throw new Error(error)
    }
 });

 //delete category
 const deleteCategory = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    validateMongoDBid(id);
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.json(deletedCategory)
    } catch (error) {
        throw new Error(error)
    }
 });

  //get a category
  const getCategory = asyncHandler(async(req, res)=>{
    const {id} = req.params;
    validateMongoDBid(id);
    try {
        const getACategory = await Category.findById(id);
        res.json(getACategory)
    } catch (error) {
        throw new Error(error)
    }
 });

 //get all category
 const getAllCategory = asyncHandler(async(req, res)=>{
    try {
        const getAllCategory = await Category.find();
        res.json(getAllCategory)
    } catch (error) {
        throw new Error(error)
    }
 });
 module.exports = {createCategory, updateCategory, deleteCategory ,getCategory, getAllCategory }