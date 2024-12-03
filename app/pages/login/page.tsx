"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { data: session } = useSession();
  const [error, setError] = useState("");
  const [isLeaving, setIsLeaving] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsEntering(true);
  }, []);

  const handleSignIn = async (provider: string) => {
    const result = await signIn(provider, {
      callbackUrl: "http://localhost:3000",
    });
    if (result?.error) {
      setError("Failed to sign in. Please try again.");
      console.error(result.error);
    }
  };

  const handleCreateAccountClick = () => {
    setIsLeaving(true);
    setTimeout(() => {
      router.push("/pages/signUp");
    }, 1000);
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center justify-center px-6 py-12 transition-transform duration-100 ${
        isEntering ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <Image
        className="lg:w-[700px] xl:w-[800px] h-auto absolute right-0 top-0 z-0"
        src="/hero2.png"
        width={1000}
        height={600}
        alt="hero_bg"
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
              Welcome Back
            </h2>
            {error && (
              <div className="text-red-500 text-center mb-4">{error}</div>
            )}
            <p className="text-center text-gray-600 mb-6">
              Sign in with one of the options below
            </p>

            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleSignIn("google")}
                className="flex items-center justify-center w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <FaGoogle className="mr-2" /> Google
              </button>

              <button
                onClick={() => handleSignIn("apple")}
                className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                <FaApple className="mr-2" /> Apple
              </button>
            </div>

            <div className="text-center mt-6">
              <span className="text-sm text-gray-500">
                Don’t have an account?{" "}
                <Link href="#" onClick={handleCreateAccountClick}>
                  <span className="text-indigo-500 font-semibold hover:underline cursor-pointer">
                    Create one
                  </span>
                </Link>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
