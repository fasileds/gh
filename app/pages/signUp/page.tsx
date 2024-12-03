"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { FaGoogle, FaApple, FaMicrosoft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SignupPage() {
  const { data: session } = useSession();
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsEntering(true);
  }, []);

  const handleLoginRedirect = () => {
    setIsLeaving(true);
    setTimeout(() => {
      router.push("/pages/login");
    }, 1000);
  };

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center py-12 transition-transform duration-100 ${
        isEntering ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Image
        className="hidden lg:block absolute left-0 top-0 w-1/2 h-full object-cover z-0"
        src="/food3-Photoroom.png"
        width={1200}
        height={600}
        alt="background_image"
        priority
      />

      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl z-10 backdrop-blur-sm bg-opacity-50">
        {session ? (
          <div className="text-lg text-green-500 font-semibold text-center">
            You are logged in!
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-indigo-900">
              Create Your Account
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Sign up with one of the options below
            </p>

            <div className="flex flex-col space-y-4">
              <button
                onClick={() => signIn("google")}
                className="flex items-center justify-center w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <FaGoogle className="mr-2" /> Register with Google
              </button>

              <button
                onClick={() => signIn("apple")}
                className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <FaApple className="mr-2" /> Register with Apple
              </button>

              <button
                onClick={() => signIn("microsoft")}
                className="flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <FaMicrosoft className="mr-2" /> Register with Microsoft
              </button>
            </div>

            <div className="text-center mt-6">
              <span className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="#" onClick={handleLoginRedirect}>
                  <span className="text-indigo-500 font-semibold hover:underline cursor-pointer">
                    Log in
                  </span>
                </Link>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
