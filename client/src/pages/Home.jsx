import React, { useEffect } from "react";
import bg from "../utils/home.jpg";
import { Link } from "react-router-dom";
const Home = () => {
  useEffect(() => {
    document.title = "Blog App | Home";
  }, []);
  return (
    <div>
      <div
        className="bg-cover bg-center h-screen bg-fixed flex flex-col gap-8 items-center justify-center"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <p className="text-6xl tracking-wider font-extrabold text-white text-center">
          Post your blogs
        </p>
        <Link
          to="/create-blog"
          className="bg-white px-4 py-2 rounded-lg hover:animate-pulse hover:bg-green-500 hover:text-white"
        >
          Create Blog
        </Link>
      </div>
    </div>
  );
};

export default Home;
