import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
const Blog = () => {
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  const userId = localStorage.getItem("userId");
  //get blog
  const getAllBlog = async () => {
    try {
      const response = await axios.get(`${url}blog/all-blog`);
      if (response.data.success) {
        setBlog(response.data.blog);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlog();
    document.title = "Blog App | All Blog";
    //eslint-disable-next-line
  }, []);

  return (
    <div className="bg-gray-400 min-h-screen mt-16 w-full flex flex-col items-center justify-center gap-4 py-6">
      {blog.map((items) => (
        <div
          className="w-[80vw] sm:w-[30rem] bg-black text-white flex justify-evenly my-2 items-center rounded-md gap-4 flex-col pt-2 pb-4"
          key={items._id}
        >
          {userId === items.user._id && (
            <div className="flex justify-end items-center w-full gap-2 pr-2">
              <AiOutlineEdit
                className="text-2xl cursor-pointer"
                onClick={() => {
                  navigate(`/blog-details/${items._id}`);
                }}
              />
              <AiOutlineDelete
                className="text-2xl cursor-pointer"
                onClick={async () => {
                  try {
                    const { data } = await axios.delete(
                      `http://localhost:8080/api/v1/blog/delete-blog/${items._id}`
                    );
                    if (data.success) {
                      alert("blog deleted");
                      window.location.reload(true);
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
            </div>
          )}
          <div className="flex items-center justify-between px-4 w-full pt-1">
            <div className="">
              <div className="capitalize text-center py-2 bg-white text-black rounded-3xl">
                {items.user.username[0]}
              </div>
              <div className="text-[0.7rem] mt-1">
                {items.createdAt.split("T")[0].split("-").reverse().join("-")}
              </div>
            </div>
            <div className="capitalize">{items.user.username}</div>
          </div>
          <img src={items.image} alt="" className="h-48 px-2" />
          <div className="underline underline-offset-4">
            <span>Title : </span>
            {items.title}
          </div>
          <div className="w-full px-4 text-center">{items.description}</div>
        </div>
      ))}
    </div>
  );
};

export default Blog;
