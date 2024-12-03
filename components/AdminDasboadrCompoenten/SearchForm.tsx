import React, { useState } from "react";

const SearchForm = () => {
  return (
    <>
      <li className="hidden lg:block">
        <form action="https://formbold.com/s/unique_form_id" method="POST">
          <div className="relative w-full max-w-[1000px]">
            <button className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-500 transition-all duration-300 ease-in-out">
              <svg
                className="fill-current"
                width="50"
                height="20"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9 2C5.13401 2 2 5.13401 2 9C2 12.866 5.13401 16 9 16C11.5228 16 13.789 14.9117 15.312 13.0786L17.7071 15.4737C18.0976 15.8642 18.0976 16.4974 17.7071 16.8879C17.3166 17.2784 16.6834 17.2784 16.2929 16.8879L13.0786 13.312C14.9117 11.789 16 9.52285 16 7C16 3.13401 12.866 0 9 0C5.13401 0 2 3.13401 2 7C2 10.866 5.13401 14 9 14C11.5228 14 13.789 12.9117 15.312 11.0786L17.7071 13.4737C18.0976 13.8642 18.0976 14.4974 17.7071 14.8879C17.3166 15.2784 16.6834 15.2784 16.2929 14.8879L13.0786 11.312C14.9117 9.789 16 7.52285 16 7C16 3.13401 12.866 0 9 0C5.13401 0 2 3.13401 2 7Z"
                  fill="currentColor"
                />
              </svg>
            </button>
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-full border-2 border-gray-300 bg-white py-2.5 pl-12 pr-5 text-gray-700 focus:border-blue-500 focus:outline-none transition-all ease-in-out duration-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 shadow-lg hover:shadow-xl focus:shadow-xl dark:focus:shadow-lg"
            />
          </div>
        </form>
      </li>
    </>
  );
};

export default SearchForm;
