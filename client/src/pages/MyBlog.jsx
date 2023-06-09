import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const MyBlog = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [userBlog, setUserBlog] = useState([]);
  //get blog
  const getAllBlog = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/blog/user-blog/${id}`
      );
      if (data.success) {
        setUserBlog(data.blog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlog();
    document.title = "Blog App | My Blog";
  }, []);

  return (
    <div className="bg-gray-400 min-h-screen mt-16 w-full flex flex-col items-center justify-center gap-4 py-6">
      {userBlog.map((items) => (
        <div
          className="w-[80vw] sm:w-[30rem] bg-black text-white flex justify-evenly my-2 items-center rounded-md gap-4 flex-col pt-2 pb-4"
          key={items._id}
        >
          {userId && (
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
              <div className="text-[0.7rem]">
                <span>Created at : </span>
                {items.createdAt.split("T")[0].split("-").reverse().join("-")}
              </div>
            </div>
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

export default MyBlog;
