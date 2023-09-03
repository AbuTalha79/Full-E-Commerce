const express = require("express");
const { authMiddleWare, isAdmin } = require("../middlewares/authMiddleware");
const { createBrand, updateBrand, deleteBrand, getBrand, getAllBrand } = require("../CONTROLLER/brandController");

const router = express.Router();

router.post("/",authMiddleWare,isAdmin,createBrand )
router.put("/:id",authMiddleWare,isAdmin,updateBrand )
router.delete("/:id",authMiddleWare,isAdmin,deleteBrand )
router.get("/:id",getBrand  )
router.get("/", getAllBrand )

module.exports=router