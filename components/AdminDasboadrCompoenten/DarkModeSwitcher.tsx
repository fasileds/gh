"use client";
import useColorMode from "@/hooks/useColorMode";

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <li>
      <div
        onClick={() => {
          if (typeof setColorMode === "function") {
            setColorMode(colorMode === "light" ? "dark" : "light");
          }
        }}
        className="relative z-10 flex items-center justify-between w-[96px] cursor-pointer rounded-full p-[5px] bg-gray-300 dark:bg-gray-700 transition-all duration-300 ease-in-out"
      >
        <div
          className={`absolute left-0.5 top-1/2 z-1 h-9.5 w-9.5 -translate-y-1/2 rounded-full bg-white transition-transform duration-300 ease-in-out dark:bg-gray-900 ${
            colorMode === "dark" ? "translate-x-[51px]" : "translate-x-[3px]"
          }`}
        />
        <span className="relative z-10 flex h-9.5 w-9.5 items-center justify-center">
          <svg
            className="fill-current text-yellow-500"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 1.0415C10.3452 1.0415 10.625 1.32133 10.625 1.6665V2.49984C10.625 2.84502 10.3452 3.12484 10 3.12484C9.65484 3.12484 9.37502 2.84502 9.37502 2.49984V1.6665C9.37502 1.32133 9.65484 1.0415 10 1.0415ZM3.66553 3.66535C3.90961 3.42127 4.30533 3.42127 4.54941 3.66535L4.87678 3.99271C5.12085 4.23679 5.12085 4.63252 4.87678 4.87659C4.6327 5.12067 4.23697 5.12067 3.99289 4.87659L3.66553 4.54923C3.42145 4.30515 3.42145 3.90942 3.66553 3.66535Z"
            />
          </svg>
        </span>
        <span className="relative z-10 flex h-9.5 w-9.5 items-center justify-center">
          <svg
            className="fill-current text-gray-400"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.18118 2.33448C5.30895 2.74335 2.29169 6.01923 2.29169 9.99984C2.29169 14.257 5.74283 17.7082 10 17.7082C13.9806 17.7082 17.2565 14.6909 17.6654 10.8187C16.5598 12.2222 14.8439 13.1248 12.9167 13.1248C9.57997 13.1248 6.87502 10.4199 6.87502 7.08317C6.87502 5.15599 7.77765 3.44009 9.18118 2.33448ZM1.04169 9.99984C1.04169 5.05229 5.05247 1.0415 10 1.0415C10.5972 1.0415 10.8962 1.51755 10.9474 1.89673C10.9967 2.26148 10.8618 2.72538 10.4426 2.97873C9.05223 3.81884 8.12502 5.34302 8.12502 7.08317C8.12502 9.72954 10.2703 11.8748 12.9167 11.8748C14.6568 11.8748 16.181 10.9476 17.0211 9.55731C17.2745 9.13804 17.7384 9.00321 18.1031 9.05247C18.4823 9.10368 18.9584 9.40265 18.9584 9.99984C18.9584 14.9474 14.9476 18.9582 10 18.9582C5.05247 18.9582 1.04169 14.9474 1.04169 9.99984Z"
            />
          </svg>
        </span>
      </div>
    </li>
  );
};

export default DarkModeSwitcher;
