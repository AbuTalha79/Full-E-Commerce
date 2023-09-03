const express = require("express");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleware");
const { createBlogCategory, updateBlogCategory, deleteBlogCategory ,getBlogCategory, getAllBlogCategory } = require("../CONTROLLER/blogCategoryCtlr");

const router = express.Router();

router.post("/",authMiddleWare,isAdmin, createBlogCategory)
router.put("/:id",authMiddleWare,isAdmin, updateBlogCategory)
router.delete("/:id",authMiddleWare,isAdmin, deleteBlogCategory)
router.get("/:id", getBlogCategory )
router.get("/", getAllBlogCategory )

module.exports=router