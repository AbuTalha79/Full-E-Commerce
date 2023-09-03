const express = require("express");
const { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory } = require("../CONTROLLER/procategoryController");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/",authMiddleWare,isAdmin, createCategory)
router.put("/:id",authMiddleWare,isAdmin, updateCategory)
router.delete("/:id",authMiddleWare,isAdmin, deleteCategory)
router.get("/:id", getCategory )
router.get("/", getAllCategory )

module.exports=router