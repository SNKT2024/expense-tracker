import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { BiSolidReport } from "react-icons/bi";
import { Link } from "react-router";

function Footer() {
  return (
    <div className="flex justify-around items-center h-16 bg-white border-t border-gray-200 shadow-sm fixed bottom-0 w-full">
      <Link to={"/"} className="text-gray-600 hover:text-indigo-600">
        <FaHome size={22} />
      </Link>

      <Link to={"/accounts"} className="text-gray-600 hover:text-indigo-600">
        <MdAccountBalance size={24} />
      </Link>

      <Link
        to={"/add-transaction"}
        className="p-3 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition"
      >
        <FaPlus size={18} />
      </Link>

      <Link to={"/report"} className="text-gray-600 hover:text-indigo-600">
        <BiSolidReport size={22} />
      </Link>

      <Link to={"/settings"} className="text-gray-600 hover:text-indigo-600">
        <IoMdSettings size={22} />
      </Link>
    </div>
  );
}

export default Footer;
