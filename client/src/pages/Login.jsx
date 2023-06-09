import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux/store";
import { toast } from "react-hot-toast";
const Login = () => {
  const url = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  //Global state
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}user/login`, {
        email: data.email,
        password: data.password,
      });
      if (response.data.success) {
        dispatch(authActions.login());
        localStorage.setItem("userId", response.data.user._id);
        const delayNavigation = () => {
          toast.success(response.data.message);
          setTimeout(() => {}, 1500);
        };
        delayNavigation();
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const items = [
    {
      type: "email",
      placeholder: "Enter your email",
      name: "email",
    },
    {
      type: "password",
      placeholder: "Enter your password",
      name: "password",
    },
  ];
  useEffect(() => {
    document.title = "Blog App | Login";
  }, []);
  return (
    <div className="min-h-screen bg-gray-400 mt-16 flex flex-col items-center justify-center h-[80vh]">
      <form
        className="bg-black px-4 sm:px-6 pt-5 sm:pt-10 pb-2 sm:pb-5 flex flex-col rounded-md items-center justify-center gap-4 text-white"
        onSubmit={handleSubmit}
      >
        <p className="text-2xl sm:text-4xl font-extralight tracking-widest">
          Login
        </p>
        {items.map((items) => (
          <div
            className="text-sm sm:text-xl flex w-auto gap-2 justify-between"
            key={items.name}
          >
            <label htmlFor="name" className="capitalize">
              {items.name} :{" "}
            </label>
            <input
              autoComplete="given-name"
              name={items.name}
              type={items.type}
              placeholder={items.placeholder}
              className="px-2 py-1 text-black rounded-md focus:outline-red-500 outline-none w-[58%] sm:w-[60%]"
              onChange={handlechange}
            />
          </div>
        ))}
        <button className="bg-white active:scale-95 text-black hover:bg-green-600 hover:text-white transition-all px-2 sm:px-4 py-1 sm:py-2 rounded-sm my-4">
          Submit
        </button>
      </form>
      <button
        className="text-gray-600 py-1 text-sm sm:text-xl"
        onClick={() => {
          navigate("/register");
        }}
      >
        Don't have an account ? Register Now !!
      </button>
    </div>
  );
};

export default Login;
