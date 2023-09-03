const BlogCategory = require ("../Model/blogCatModel")
const asyncHandler = require("express-async-handler")
const validateMongoDBid= require("../Utils/validateMongoDBid")

//create blog category
const createBlogCategory = asyncHandler(async(req, res)=>{
   try {
       const newBlogCategory = await BlogCategory.create(req.body);
       res.json(newBlogCategory)
   } catch (error) {
       throw new Error(error)
   }
});

//update blog category
const updateBlogCategory = asyncHandler(async(req, res)=>{
   const {id} = req.params;
   validateMongoDBid(id);
   try {
       const updatedBlogCategory = await BlogCategory.findByIdAndUpdate(id, req.body, {new : true});
       res.json(updatedBlogCategory)
   } catch (error) {
       throw new Error(error)
   }
});

//delete blog category
const deleteBlogCategory = asyncHandler(async(req, res)=>{
   const {id} = req.params;
   validateMongoDBid(id);
   try {
       const deletedBlogCategory = await BlogCategory.findByIdAndDelete(id);
       res.json(deletedBlogCategory)
   } catch (error) {
       throw new Error(error)
   }
});

 //get a blog category
 const getBlogCategory = asyncHandler(async(req, res)=>{
   const {id} = req.params;
   validateMongoDBid(id);
   try {
       const getAblogCategory = await BlogCategory.findById(id);
       res.json(getAblogCategory)
   } catch (error) {
       throw new Error(error)
   }
});

//get all blog category
const getAllBlogCategory = asyncHandler(async(req, res)=>{
   try {
       const getAllBlogCategory = await BlogCategory.find();
       res.json(getAllBlogCategory)
   } catch (error) {
       throw new Error(error)
   }
});
module.exports = {createBlogCategory, updateBlogCategory, deleteBlogCategory ,getBlogCategory, getAllBlogCategory }