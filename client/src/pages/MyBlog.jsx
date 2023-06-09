import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

const MyBlog = () => {
  const [loading, setLoading] = useState(false);
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [userBlog, setUserBlog] = useState([]);
  //get blog
  const getAllBlog = async () => {
    setLoading(true);
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`${url}blog/user-blog/${id}`);
      if (data.success) {
        setUserBlog(data.blog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllBlog();
    document.title = "Blog App | My Blog";
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`bg-gray-700 min-h-screen mt-16 w-full flex flex-col items-center justify-center gap-4 py-6`}
    >
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <FadeLoader />
        </div>
      ) : (
        <div>
          {userBlog.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-12 text-center">
              <p className="text-3xl sm:text-4xl text-white">
                Please Create a blog first
              </p>
              <Link
                to="/create-blog"
                className="bg-white px-2 sm:px-4 py-1 text-sm sm:text-xl sm:py-2 rounded-lg hover:animate-pulse hover:bg-green-500 hover:text-white"
              >
                Create Blog
              </Link>
            </div>
          ) : (
            userBlog.map((items) => (
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
                            toast.success("Blog deleted");
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
                      {items.createdAt
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </div>
                  </div>
                </div>
                <img src={items.image} alt="" className="h-48 px-2" />
                <div className="underline underline-offset-4">
                  <span>Title : </span>
                  {items.title}
                </div>
                <div className="w-full px-4 text-center">
                  {items.description}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MyBlog;
