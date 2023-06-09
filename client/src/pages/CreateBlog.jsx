import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const content = [
    {
      name: "title",
      placeholder: "Enter title",
    },
    {
      name: "image",
      placeholder: "Enter image url",
    },
  ];
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };
  const id = localStorage.getItem("userId");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(input);
      const response = await axios.post(
        `http://localhost:8080/api/v1/blog/create-blog`,
        {
          title: input.title,
          description: input.description,
          user: id,
          image: input.image,
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
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  useEffect(() => {
    document.title = "Blog App | Create Blog";
  }, []);
  return (
    <div className="bg-gray-400 min-h-screen mt-16 flex justify-center items-center h-[80vh]">
      <form
        className="bg-black text-white flex items-center justify-between gap-4 flex-col py-2 sm:py-4 px-5 sm:px-10 rounded-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl sm:text-4xl tracking-wider font-light underline underline-offset-8 mb-2">
          Create a Blog
        </h1>
        {content.map((items) => (
          <div
            className="flex justify-between items-center w-full gap-4 sm:gap-8"
            key={items.name}
          >
            <label className="capitalize">{items.name}</label>
            <input
              type="text"
              placeholder={items.placeholder}
              className="px-2 py-1 rounded-md outline-none text-black focus:outline-2 focus:outline-green-400 w-[58%] sm:w-[60%]"
              onChange={handleChange}
              name={items.name}
            />
          </div>
        ))}
        <div className="flex justify-between items-center sm:gap-2">
          <label htmlFor="">Enter description</label>
          <textarea
            onChange={handleChange}
            name="description"
            className="resize-none bg-gray-100 px-2 py-1 rounded-md outline-none text-black focus:outline-2 focus:outline-green-400 w-[58%] sm:w-[60%]"
            placeholder="Enter description"
            cols="30"
            rows="10"
          />
        </div>
        <button className="bg-white px-1 sm:px-3 py-1 rounded-md active:scale-95 text-black text-base sm:text-xl hover:bg-green-600 hover:text-white transition-all">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
