"use client";
import React, { useState } from "react";

export default function IntroVideo() {
  const [showVideo, setShowVideo] = useState(true);

  const handleSkip = () => {
    setShowVideo(false);
  };

  return (
    showVideo && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md">
        <div className="relative w-full h-full flex items-center justify-center">
          <iframe
            className="w-[320px] h-[570px] rounded-xl shadow-lg"
            src="https://www.youtube.com/embed/Pc3bRbQE-cI?autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          {/* Skip Button */}
          <button
            className="absolute top-6 right-6 bg-red-600 text-white px-5 py-2 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 hover:bg-red-700 focus:outline-none"
            onClick={handleSkip}
          >
            Skip
          </button>
        </div>
      </div>
    )
  );
}
