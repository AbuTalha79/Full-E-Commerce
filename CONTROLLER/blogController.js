const { Error } = require("mongoose")
const Blog = require("../Model/blogModel")
const user = require("../Model/userModel")
const validateMongoDbId = require("../Utils/validateMongoDBid")
const asyncHandler = require("express-async-handler")

//create a blog
const createBlog = asyncHandler(async(req,res) => {
    validateMongoDbId();
    try {
        const newBlog = await Blog.create(req.body);
        res.json(newBlog);
    } catch (error) {
        throw new Error(error)
    }
});

//update blog
const updateBlog = asyncHandler(async(req,res) => {
    const { id } = req.params;
    validateMongoDbId();
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body ,{new: true});
        res.json(updatedBlog);
    } catch (error) {
        throw new Error(error)
    }
});

//get Blog
const getBlog = asyncHandler(async(req,res) => {
    const { id } = req.params;
    validateMongoDbId();
    try {
        const getBlog = await Blog.findById(id);
        const updateViews = await Blog.findByIdAndUpdate(
            id, 
            {
                $inc: {numViews: 1},
            },
            {new:true}
        );
        res.json(updateViews)
    } catch (error) {
        throw new Error(error)
    }
});

//get all blog
const getAllBlog = asyncHandler(async(req,res) => {
    try {
        const getAllBlog = await Blog.find();
        res.json(getAllBlog);
    } catch (error) {
        throw new Error(error)
    }
});

//delete a blog
const deleteBlog = asyncHandler(async(req,res) => {
    const { id } = req.params;
    validateMongoDbId();
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        res.json(deletedBlog);
    } catch (error) {
        throw new Error(error)
    }
});

//like and dislike
const likeBlog = asyncHandler(async(req,res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);

    //Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);

    //find the login user
    const loginUserId = req?.user?._id;

    //find if the user has liked the blog
    const isLiked = blog?.isLiked;
    
    //find if the user has disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(
        (userId => userId?.toString() === loginUserId?.toString())
    );
    if(alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: {dislikes: loginUserId },
                isDisliked: false,
            },
            {new:true}
        );
        res.json(blog)
    }
    if(isLiked) {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: {likes: loginUserId },
                isliked: false,
            },
            {new:true}
        );
        res.json(blog)
    }else{
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {
                $pull: {likes: loginUserId },
                isDisliked: true,
            },
            {new:true}
        );
        res.json(blog)
    }
})

module.exports= {createBlog , updateBlog, getBlog, getAllBlog, deleteBlog, likeBlog}