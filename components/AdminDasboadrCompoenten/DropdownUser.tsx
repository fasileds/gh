"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "./ClickOutside";
import { FiSettings } from "react-icons/fi";
const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 cursor-pointer hover:text-primary transition-all duration-200 ease-in-out"
        href="#"
      >
        <span className="h-12 w-12 rounded-full overflow-hidden">
          <Image
            width={112}
            height={112}
            src="/images/user/user-03.png"
            alt="User"
            className="object-cover rounded-full"
          />
        </span>
        <span className="flex items-center gap-2 font-medium text-dark dark:text-white">
          <span className="hidden lg:block">Jhon Smith</span>
          <svg
            className={`fill-current duration-200 ease-in ${
              dropdownOpen && "rotate-180"
            }`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.6921 7.09327C3.91674 6.83119 4.3113 6.80084 4.57338 7.02548L9.99997 11.6768L15.4266 7.02548C15.6886 6.80084 16.0832 6.83119 16.3078 7.09327C16.5325 7.35535 16.5021 7.74991 16.24 7.97455L10.4067 12.9745C10.1727 13.1752 9.82728 13.1752 9.59322 12.9745L3.75989 7.97455C3.49781 7.74991 3.46746 7.35535 3.6921 7.09327Z"
              fill=""
            />
          </svg>
        </span>
      </Link>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-[280px] flex flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-lg dark:border-dark-3 dark:bg-gray-dark">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b border-stroke dark:border-dark-3">
            <span className="relative block h-12 w-12 rounded-full overflow-hidden">
              <Image
                width={112}
                height={112}
                src="/images/user/user-03.png"
                alt="User"
                className="object-cover rounded-full"
              />
            </span>

            <span>
              <span className="block font-medium text-dark ">Jhon Smith</span>
              <span className="block text-sm text-dark-5 dark:text-dark-6">
                jonson@nextadmin.com
              </span>
            </span>
          </div>

          <ul className="flex flex-col gap-1 p-2.5">
            <li>
              <Link
                href="/profile"
                className="flex items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3  lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99998 0.9375C7.03246 0.9375 5.43748 2.53249 5.43748 4.5C5.43748 6.46751 7.03246 8.0625 8.99998 8.0625C10.9675 8.0625 12.5625 6.46751 12.5625 4.5C12.5625 2.53249 10.9675 0.9375 8.99998 0.9375ZM6.56248 4.5C6.56248 3.15381 7.65378 2.0625 8.99998 2.0625C10.3462 2.0625 11.4375 3.15381 11.4375 4.5C11.4375 5.84619 10.3462 6.9375 8.99998 6.9375C7.65378 6.9375 6.56248 5.84619 6.56248 4.5Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99998 9.1875C7.26482 9.1875 5.66617 9.58191 4.48157 10.2483C3.31459 10.9047 2.43748 11.8995 2.43748 13.125L2.43743 13.2015C2.43658 14.0729 2.43552 15.1665 3.39479 15.9477C3.86689 16.3321 4.52734 16.6055 5.41964 16.7861C6.31442 16.9672 7.48065 17.0625 8.99998 17.0625C10.5193 17.0625 11.6855 16.9672 12.5803 16.7861C13.4726 16.6055 14.1331 16.3321 14.6052 15.9477C15.5644 15.1665 15.5634 14.0729 15.5625 13.2015L15.5625 13.125C15.5625 11.8995 14.6854 10.9047 13.5184 10.2483C12.3338 9.58191 10.7351 9.1875 8.99998 9.1875ZM3.56248 13.125C3.56248 12.4865 4.02851 11.7939 5.03311 11.2288C6.02008 10.6736 7.42143 10.3125 8.99998 10.3125C10.5785 10.3125 11.9799 10.6736 12.9668 11.2288C13.9714 11.7939 14.4375 12.4865 14.4375 13.125C14.4375 14.1059 14.4072 14.658 13.8948 15.0753C13.6169 15.3016 13.1523 15.5225 12.3571 15.6835C11.5644 15.8439 10.4806 15.9375 8.99998 15.9375C7.51931 15.9375 6.43553 15.8439 5.64282 15.6835C4.84762 15.5225 4.38307 15.3016 4.10517 15.0753C3.59271 14.658 3.56248 14.1059 3.56248 13.125Z"
                  />
                </svg>
                View profile
              </Link>
            </li>

            <li>
              <Link
                href="/pages/settings"
                className="flex items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 lg:text-base"
              >
                <FiSettings className="text-current" size={18} />
                Settings
              </Link>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
