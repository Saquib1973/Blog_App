import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../Redux/store";
import { toast } from "react-hot-toast";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname.split("/")[1];
  //Global State
  console.log();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.isLogin);
  return (
    <div className="fixed inset-0 h-[4rem] md:h-[5rem] flex justify-between tracking-wider items-center px-8 md:px-16 md:py-8 bg-black text-white">
      <Link to="/" className="text-base md:text-2xl font-thin md:w-auto">
        Blog App
      </Link>
      <div className="w-[50vw] flex items-center justify-start gap-4">
        {isLogin && (
          <div className="flex items-center justify-center gap-1 md:gap-4 w-full">
            <Link
              to="/blog"
              className={`cursor-pointer transition-all hidden md:block border-b-4 text-sm w-auto md:text-xl px-2 md:px-4 md:py-2 rounded-sm ${
                currentLocation === "blog"
                  ? "border-white "
                  : "border-transparent"
              }`}
            >
              Blogs
            </Link>
            <HiOutlineDocumentText
              className={`block md:hidden text-2xl mx-1 ${
                currentLocation === "blog" ? "text-red-600" : ""
              }`}
              onClick={() => {
                navigate("/blog");
              }}
            />
            <Link
              to="/my-blog"
              className={`cursor-pointer transition-all border-b-4 text-sm w-auto md:text-xl px-2 md:px-4 md:py-2 hidden md:block rounded-sm ${
                currentLocation === "my-blog"
                  ? "border-white "
                  : "border-transparent"
              }`}
            >
              My Blogs
            </Link>
            <AiOutlineUser
              className={`block md:hidden text-2xl mx-1 ${
                currentLocation === "my-blog" ? "text-red-600" : ""
              }`}
              onClick={() => {
                navigate("/my-blog");
              }}
            />
            <Link
              to="/create-blog"
              className={`cursor-pointer transition-all hidden md:block border-b-4 text-sm w-auto md:text-xl px-2 md:px-4 md:py-2 rounded-sm ${
                currentLocation === "create-blog"
                  ? "border-white "
                  : "border-transparent"
              }`}
            >
              Create Blogs
            </Link>
            <MdOutlineCreateNewFolder
              className={`block md:hidden text-2xl mx-1 ${
                currentLocation === "create-blog" ? "text-red-600" : ""
              }`}
              onClick={() => {
                navigate("/create-blog");
              }}
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-around">
        {!isLogin && (
          <div className="flex items-center justify-evenly gap-2 w-1/3 md:w-1/2">
            <Link
              to="/login"
              className={`cursor-pointer transition-all px-2 md:px-4 py-1 md:py-2 text-base md:text-xl rounded-md ${
                currentLocation === "login" ? "bg-white text-black" : ""
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`cursor-pointer transition-all px-2 md:px-4 py-1 md:py-2 text-base md:text-xl rounded-md ${
                currentLocation === "register" ? "bg-white text-black" : ""
              }`}
            >
              Register
            </Link>
          </div>
        )}
        {isLogin && (
          <button
            className="cursor-pointer transition-all hover:shadow-md text-sm md:text-xl mr-4 bg-red-300 hover:shadow-rose-100/70 hover:bg-rose-500 px-2 py-1 md:px-4 md:py-2 rounded-md"
            onClick={() => {
              const delayNavigation = () => {
                toast.success("Logged Out");
                dispatch(authActions.logout());
                localStorage.removeItem("userId");
                setTimeout(() => {}, 1500);
              };
              delayNavigation();
              navigate("/");
              window.location.reload(true);
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
