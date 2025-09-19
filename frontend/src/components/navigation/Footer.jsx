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

      <div className="relative group">
        <button
          disabled
          className="text-gray-400 cursor-not-allowed p-2 rounded"
        >
          <BiSolidReport size={22} />
        </button>
        <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs text-white bg-black px-2 py-1 rounded">
          Coming Soon
        </span>
      </div>
      <div className="relative group">
        <button
          disabled
          className="text-gray-400 cursor-not-allowed p-2 rounded"
        >
          <IoMdSettings size={22} />
        </button>
        <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs text-white bg-black px-2 py-1 rounded">
          Coming Soon
        </span>
      </div>
    </div>
  );
}

export default Footer;
