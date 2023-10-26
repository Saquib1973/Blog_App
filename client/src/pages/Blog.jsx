import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
const Blog = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const blogsPerPage = 5; // Number of blogs per page
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const [blog, setBlog] = useState([]);
  const currentBlogs = blog.slice(indexOfFirstBlog, indexOfLastBlog);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  //get blog
  const getAllBlog = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}blog/all-blog`);
      if (response.data.success) {
        setBlog(response.data.blog);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getAllBlog();
    document.title = "Blog App | All Blog";
    //eslint-disable-next-line
  }, []);

  return (
    <div className="bg-gray-400 min-h-screen mt-16 w-full flex flex-col items-center justify-center gap-4 py-6">
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <FadeLoader />
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {currentBlogs.map((items, index) => (
            <div
              className={`w-[80vw] sm:w-[30rem] ${
                index % 2 === 0
                  ? "bg-gray-800 text-gray-300"
                  : "text-gray-900 bg-gray-500"
              } flex justify-evenly my-2 items-center rounded-md gap-4 flex-col px-10 pt-2 pb-4`}
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
                  <div className="capitalize text-center py-2 bg-white text-black rounded-3xl">
                    {items.user.username[0]}
                  </div>
                  <div className="text-[0.7rem] mt-1">
                    {items.createdAt
                      .split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}
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
      )}
      <div className="pagination mt-10">
        <ul className="flex gap-4">
          {Array(Math.ceil(blog.length / blogsPerPage))
            .fill()
            .map((_, i) => (
              <li
                key={i}
                onClick={() => paginate(i + 1)}
                className={
                  currentPage === i + 1
                    ? "active bg-red-400 text-white p-1 px-3 transition-all cursor-pointer rounded-lg"
                    : "p-1 px-2 rounded-lg cursor-pointer hover:bg-white transition-all text-white hover:text-red-400"
                }
              >
                {i + 1}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
