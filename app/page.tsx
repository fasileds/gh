"use client";
import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";

export default function Page() {
  const playSound = () => {
    const audio = new Audio("/bellSound.mp3");
    audio
      .play()
      .then(() => console.log("Sound played successfully!"))
      .catch((error) => console.error("Error playing sound:", error));
  };
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const { data: session } = useSession();
  const [error, setError] = useState("");

  const handleSignIn = async (provider: string) => {
    const result = await signIn(provider, {
      callbackUrl: "http://localhost:3000",
    });
    if (result?.error) {
      setError("Failed to sign in. Please try again.");
      console.error(result.error);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <header className="relative bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 shadow-lg rounded-b-3xl">
        <div className="flex justify-between items-center py-4 px-6 md:py-6 md:px-16">
          <AcmeLogo />
          <a
            href="/pages/signUp"
            className="flex items-center gap-3 bg-white text-green-700 rounded-full px-6 py-3 text-sm font-medium shadow-md transition-transform transform hover:scale-105 hover:bg-green-50"
          >
            <span>Create Account</span>
            <ArrowRightIcon className="w-5 text-green-600" />
          </a>
        </div>
      </header>
      <div className="flex flex-col md:flex-row gap-8 mt-[-20px] px-6 py-10 md:px-12 md:py-16 items-center">
        <div className="flex flex-col items-center md:w-2/3">
          <div className="rounded-2xl bg-white shadow-xl p-6 w-full max-w-2xl border border-gray-200">
            <Slider {...sliderSettings}>
              {[
                {
                  src: "/beef-dish-restaurant.jpg",
                  distance: "5 km",
                  price: "$25",
                  restaurantName: "Awesome Restaurant",
                  dishName: "Beef Dish",
                },
                {
                  src: "/delicious-indian-food-tray.jpg",
                  distance: "10 km",
                  price: "$30",
                  restaurantName: "Indian Spice",
                  dishName: "Indian Platter",
                },
                {
                  src: "/delicious-tacos-arrangement.jpg",
                  distance: "2 km",
                  price: "$15",
                  restaurantName: "Taco Fiesta",
                  dishName: "Tacos",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <Image
                    src={item.src}
                    width={600}
                    height={400}
                    alt={`Dish ${index + 1}`}
                    className="rounded-lg object-cover w-full h-72"
                  />
                  <div className="absolute top-4 right-4 flex items-center">
                    <div className="flex items-center bg-green-600 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                      {/* Notification Bell */}
                      <div className="flex justify-center items-center w-10 h-10 rounded-l-full bg-green-600">
                        <img
                          className="h-5 w-5 object-contain"
                          src="/bell1.png"
                          alt="Notification Bell"
                          onMouseEnter={playSound}
                        />
                      </div>
                      <div className="px-4 py-1 text-sm font-semibold bg-green-600 rounded-r-full">
                        Price: {item.price}
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-gray-800 text-white px-3 py-1 rounded-md text-xs">
                    Restaurant: {item.restaurantName}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-gray-800 text-white px-3 py-1 rounded-md text-xs">
                    Dish: {item.dishName}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-gray-100 shadow-md p-6 w-full max-w-md md:w-1/3">
          <h2 className="text-2xl font-bold text-gray-800">Dinner Bell</h2>
          <p className="text-center text-gray-600 text-base">
            Dinner Bell is a web app where food trucks and small restaurants can
            advertise specific dishes locally using YouTube. Explore nearby
            restaurants and dishes with our demo ads.
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-[-50px] px-6 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {session ? (
            <div className="text-center text-lg text-green-500 font-semibold">
              You are logged in!
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-indigo-900 text-center mb-4">
                Sign In Now
              </h2>
              {error && (
                <div className="text-red-500 text-center mb-4">{error}</div>
              )}
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handleSignIn("google")}
                  className="flex items-center justify-center w-full bg-red-500 text-white py-3 rounded-lg transition-transform transform hover:scale-105"
                >
                  <FaGoogle className="mr-2" /> Google
                </button>
                <button
                  onClick={() => handleSignIn("apple")}
                  className="flex items-center justify-center w-full bg-black text-white py-3 rounded-lg transition-transform transform hover:scale-105"
                >
                  <FaApple className="mr-2" /> Apple
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <footer className="bg-gray-200 py-4 shadow-inner flex justify-center">
        <p className="text-sm text-gray-600">Demo Ads</p>
      </footer>
    </main>
  );
}
