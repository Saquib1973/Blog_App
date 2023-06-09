import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
function Footer() {
  return (
    <div className="px-4 py-6 md:py-8 border-t-4 border-black bg-white flex justify-center items-center flex-col md:flex-row md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center">
        © 2023{" "}
        <Link to="https://saquib-ali.web.app/" target="_blank">
          Saquib™
        </Link>
        . All Rights Reserved.
      </span>
      <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
        <Link to="/" className="hover:text-red-400 text-2xl md:text-3xl ">
          <AiFillFacebook />
        </Link>
        <Link to="/" className="hover:text-red-400 text-2xl md:text-3xl ">
          <AiFillInstagram />
        </Link>
        <Link to="/" className="hover:text-red-400 text-2xl md:text-3xl ">
          <AiFillTwitterCircle />
        </Link>
        <Link to="/" className="hover:text-red-400 text-2xl md:text-3xl ">
          <AiFillGithub />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
