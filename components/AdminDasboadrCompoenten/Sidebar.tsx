"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaTachometerAlt,
  FaUserAlt,
  FaRegPlayCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("/");

  const handleLinkClick = (link: any) => {
    setActiveLink(link);
  };

  return (
    <aside className="sticky top-0 z-10 flex flex-col w-72 bg-white shadow-lg border-r border-stroke dark:bg-gray-800 dark:border-stroke-dark h-screen">
      <div className="flex items-center justify-between gap-4 px-6 py-6">
        <Link href="/adminDashboard">
          <div className="flex items-center space-x-4">
            <Image
              width={60} // Increased size for better visibility
              height={60}
              src="/bell3.png"
              alt="Logo"
              priority
              className="hidden dark:block"
              style={{ width: "auto", height: "auto" }}
            />
            <div>
              <span className="text-2xl font-semibold text-green-500">
                Diner Bell
              </span>
            </div>
          </div>
        </Link>

        <button className="block lg:hidden">
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-col gap-6 px-6 py-8 overflow-y-auto">
        <nav>
          <Link href="/adminDashboard" onClick={() => handleLinkClick("/")}>
            <div
              className={`flex items-center gap-4 p-3 rounded-md transition-all ${
                activeLink === "/adminDashboard"
                  ? "bg-primary text-white"
                  : "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              }`}
            >
              <FaTachometerAlt className="text-2xl" />
              <span className="text-[15px] font-[300]">Dashboard</span>{" "}
            </div>
          </Link>
          <Link
            href="/adminDashboard/users"
            onClick={() => handleLinkClick("/users")}
          >
            <div
              className={`flex items-center gap-4 p-3 rounded-md transition-all ${
                activeLink === "/adminDashboard/users"
                  ? "bg-primary text-white"
                  : "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              }`}
            >
              <FaUserAlt className="text-2xl" />
              <span className="text-[15px] font-[300]">Users</span>
            </div>
          </Link>
          <Link
            href="/adminDashboard/UplodedVideos"
            onClick={() => handleLinkClick("/videos")}
          >
            <div
              className={`flex items-center gap-4 p-3 rounded-md transition-all ${
                activeLink === "/UplodedVideos"
                  ? "bg-primary text-white"
                  : "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              }`}
            >
              <FaRegPlayCircle className="text-2xl" />
              <span className="text-[15px] font-[300]">Videos</span>
            </div>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-0 right-0 mx-4 mb-4">
          <button className="flex items-center justify-center w-full h-12 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <FaSignOutAlt className="text-2xl text-white transition-all duration-300 ease-in-out transform hover:rotate-12" />
            <span className="text-lg">Log Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
