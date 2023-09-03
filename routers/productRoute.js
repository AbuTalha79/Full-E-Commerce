const express = require("express");
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating } = require("../CONTROLLER/productController");
const { isAdmin, authMiddleWare } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/newproduct",authMiddleWare,isAdmin,createProduct);
router.put("/updateproduct/:id",authMiddleWare,isAdmin,updateProduct)
router.put("/rating",authMiddleWare, rating )
router.delete("/delete/:id",authMiddleWare,isAdmin,deleteProduct)
router.get("/singleproduct/:id", getaProduct)
router.get("/allproduct", getAllProduct)
router.put("/wishlist",authMiddleWare, addToWishlist)

module.exports = router