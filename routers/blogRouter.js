const express = require("express");
const router = express.Router();
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleware");
const { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog, likeBlog } = require("../CONTROLLER/blogController");

router.post("/create-blog",authMiddleWare, isAdmin, createBlog)
router.put("/likes",authMiddleWare, likeBlog)
router.put("/update-blog/:id",authMiddleWare, isAdmin, updateBlog)
router.get("/get-blog/:id", getBlog)
router.get("/get-all-blog", getAllBlog)
router.delete("/delete/:id", deleteBlog)

module.exports = router 