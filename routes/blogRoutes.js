const express = require("express");
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  getOneBlog,
  deleteBlog,
  userBlog,
} = require("../controllers/blogController");

//Router setup
const router = express.Router();

//Routes
//get all blogs || GET
router.get("/all-blog", getAllBlogs);
//create blog || POST
router.post("/create-blog", createBlog);
//update blog || PUT
router.put("/update-blog/:id", updateBlog);
//get single blog by id || GET
router.get("/get-blog/:id", getOneBlog);
//delete a blog || DELETE
router.delete("/delete-blog/:id", deleteBlog);
//user blogs || GET
router.get("/user-blog/:id", userBlog);
module.exports = router;
