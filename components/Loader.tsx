"use client";
import { useEffect } from "react";

function Loader() {
  useEffect(() => {
    if (document) {
      const loaderElement = document.querySelector(".loader");
      const intervalId = setInterval(() => {
        if (loaderElement) {
          loaderElement.classList.add("fade-out");
        }
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="loader fixed top-0 left-0 h-full w-full z-50 bg-white flex flex-col items-center justify-center overflow-hidden transition duration-300">
      <div className="flex items-center">
        {/* Animated Bell Icon */}
        <div className="text-6xl transform origin-top animate-ring">🔔</div>
        <div className="ml-4 text-2xl font-semibold text-gray-700">
          Loading...
        </div>
      </div>

      <style jsx>{`
        .fade-out {
          opacity: 0;
          transition: opacity 1s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Loader;
