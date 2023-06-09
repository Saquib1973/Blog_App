import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const BlogDetails = () => {
  const navigate = useNavigate();
  const id = useParams().id;
  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image: "",
    user: "",
  });
  //get blog details
  const getBlogDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/get-blog/${id}`
      );
      if (data.success) {
        setBlog({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.image,
          user: data.blog.user,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/blog/update-blog/${id}`,
        {
          title: blog.title,
          description: blog.description,
          user: localStorage.getItem("userId"),
          image: blog.image,
        }
      );
      if (response.data.success) {
        const delayNavigation = () => {
          toast.success(response.data.message);
          setTimeout(() => {}, 3000);
        };
        delayNavigation();
        navigate("/my-blog");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetails();
    document.title = "Blog App | Editting Blog";
    // eslint-disable-next-line
  }, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlog({ ...blog, [name]: value });
  };

  return (
    <div className="bg-gray-400 mt-16 flex justify-center items-center h-[80vh] min-h-screen">
      <form
        className="bg-black text-white flex items-center justify-between gap-4 flex-col py-4 px-10 rounded-md"
        onSubmit={handleSubmit}
      >
        <h1>Create a Blog</h1>

        <div className="flex justify-between  w-full items-center gap-8">
          <label className="capitalize text-base sm:text-xl">title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={blog.title}
            className="px-2 py-1 rounded-md text-black w-[58%] sm:w-[60%]"
            onChange={handleChange}
            name="title"
          />
        </div>
        <div className="flex justify-between w-full  items-center gap-8">
          <label className="capitalize text-base sm:text-xl">Image url</label>
          <input
            type="text"
            value={blog.image}
            placeholder="Enter image url"
            className="px-2 py-1 rounded-md text-black w-[58%] sm:w-[60%]"
            onChange={handleChange}
            name="image"
          />
        </div>

        <div className="flex justify-between w-full  items-center gap-2">
          <label htmlFor="" className=" text-base sm:text-xl">
            Enter description
          </label>
          <textarea
            onChange={handleChange}
            name="description"
            value={blog.description}
            className="resize-none bg-gray-100 px-2 py-1 rounded-md text-black w-[65%] sm:w-[60%]"
            placeholder="Enter description"
            cols="30"
            rows="10"
          />
        </div>
        <button className="bg-white px-1 sm:px-3 py-1 rounded-md active:scale-95 text-black hover:bg-green-600 hover:text-white transition-all">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogDetails;
