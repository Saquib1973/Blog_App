import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  //initializing navigate function to navigate between tabs
  const navigate = useNavigate();
  //variable to store data
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  //Function to save value of input whenever changed
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  //Function to handle FORM submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        {
          username: data.name,
          password: data.password,
          email: data.email,
        }
      );
      if (response.data.success) {
        const delayNavigation = () => {
          toast.success(response.data.message);
          setTimeout(() => {}, 3000);
        };
        delayNavigation();
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  //Items Array
  const items = [
    {
      type: "text",
      placeholder: "Enter your name",
      name: "name",
    },
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
    document.title = "Blog App | Register";
  }, []);

  return (
    <div className="min-h-screen bg-gray-400 mt-16 flex flex-col items-center justify-center h-[80vh]">
      <form
        className="bg-black px-4 sm:px-6 pt-5 sm:pt-10 pb-2 sm:pb-5 flex flex-col rounded-md items-center justify-center gap-4 text-white"
        onSubmit={handleSubmit}
      >
        <p className="text-2xl sm:text-4xl font-extralight tracking-widest">
          Register
        </p>
        {items.map((items) => (
          <div
            className="text-sm sm:text-xl flex w-full gap-2 justify-between"
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
        <button className="bg-white px-2 sm:px-4 py-1 sm:py-2 rounded-sm my-4 active:scale-95 text-black hover:bg-green-600 hover:text-white transition-all">
          Submit
        </button>
      </form>
      <button
        className="text-gray-600 py-1 text-sm sm:text-xl"
        onClick={() => {
          navigate("/login");
        }}
      >
        Already have an account ? Login Here
      </button>
    </div>
  );
};

export default Register;
