import React, { useState } from "react";
import { useVideoContext } from "@/app/context/VideoContext";

export default function Porture() {
  const { setPortraitVideoData } = useVideoContext();
  const [pvideoFile, setpVideoFile] = useState<string | null>(null);
  const { formData } = useVideoContext();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setpVideoFile(fileURL);
      setPortraitVideoData(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setpVideoFile(fileURL);
      setPortraitVideoData(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  return (
    <div className="flex-1 pl-[100px] pr-[100px]">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
        Upload Portrait Video
      </h2>
      <div className="flex flex-col gap-8">
        {pvideoFile ? (
          <div className="relative w-[300px] h-[500px] rounded-[40px] border-4 border-gray-800 shadow-lg mb-4 p-4 flex flex-col items-center justify-center overflow-hidden bg-white transition-transform transform hover:scale-105 duration-300">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80px] h-[20px] bg-gray-700 rounded-b-lg"></div>
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[60px] h-[5px] bg-gray-600 rounded-full"></div>
            <div className="absolute top-2 right-[30px] w-[8px] h-[8px] bg-gray-600 rounded-full"></div>

            <video
              className="w-full h-[300px] rounded-lg border border-gray-300 object-cover shadow-md transition-transform duration-300 hover:scale-105"
              controls
              src={pvideoFile}
            />
            <div className="flex flex-col items-center text-center mt-2 bg-gray-100 rounded-lg p-3 shadow-md transition-transform duration-300 hover:scale-105 w-full">
              <p className="text-lg font-semibold text-gray-800">
                Price:{" "}
                <span className="font-bold text-green-600">
                  ${formData.price}
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {formData.description}
              </p>
            </div>
          </div>
        ) : (
          <label
            htmlFor="dropzone-video"
            className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-dashed rounded-lg cursor-pointer transition-all duration-300 ease-in-out bg-gradient-to-b from-gray-50 to-gray-100 shadow-lg hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 hover:shadow-xl"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 space-y-2">
              <svg
                className="w-16 h-16 text-gray-600 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-400">
                Click to upload or drag & drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                MP4, MOV, AVI (Max. 100MB)
              </p>
            </div>
            <input
              id="dropzone-video"
              type="file"
              className="hidden"
              accept="video/*"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    </div>
  );
}
