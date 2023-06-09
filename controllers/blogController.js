//Imports
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

const getAllBlogs = async (req, res) => {
  try {
    const blog = await blogModel.find({}).populate("user");
    if (!blog) {
      return res.status(200).send({
        success: false,
        message: "Couldn't find blogs",
      });
    }
    return res.status(200).send({
      success: true,
      blogsCount: blog.length,
      message: "Blogs Found Succesfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please enter all fields",
      });
    }
    console.log("done 1");
    const existingUser = await userModel.findById(user);
    console.log(existingUser);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }
    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    console.log("done");
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    return res.status(200).send({
      success: true,
      message: "Blog created successfully",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: `Couldn't create blog error : ${error.message}`,
    });
  }
};
const updateBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const { id } = req.params;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {}
};
const getOneBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blog Found successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: `Following error occured : ${error.message}`,
    });
  }
};
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: `Error while deleting blog , Error : ${error.message}`,
    });
  }
};

//user blogs || GET
const userBlog = async (req, res) => {
  try {
    const blog = await userModel.findById(req.params.id).populate("blogs");
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }
    return res.status(200).send({
      blogsCount: blog.length,
      success: true,
      message: "Blog successfully found",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      message: `Error while getting user blog, Error : ${error.message}`,
    });
  }
};
module.exports = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  getOneBlog,
  userBlog,
};
