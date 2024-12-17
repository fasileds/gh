"use client";
import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  return (
    <main className="flex flex-col max-h-screen bg-gray-50">
      <header className="flex flex-col h-8 md:h-32 shrink-0 justify-between rounded-b-3xl bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 px-6 md:px-16 shadow-2xl">
        <div className="flex items-center justify-between pt-2 md:pt-6">
          <div className="flex items-center gap-4">
            <AcmeLogo />
          </div>
          <a
            href="/pages/signUp"
            className="flex cursor-pointer items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-700 shadow-lg transition-all duration-300 hover:bg-green-50 hover:shadow-2xl md:px-8 md:py-4 md:text-base"
          >
            <span>Create Account</span>
            <ArrowRightIcon className="w-5 md:w-6 text-green-600" />
          </a>
        </div>
      </header>

      <div className="flex  flex-col gap-1 mt-[-120px] px-6 py-10 md:px-12 md:py-16 items-center">
        <div className="flex flex-col justify-center mb-[-100px] items-center min-h-screen">
          <div className="flex flex-col justify-center gap-8 rounded-2xl bg-white shadow-xl p-6 w-[375px] sm:w-[600px] h-[700px] sm:h-[400px] border border-gray-300 relative">
            <div className="flex flex-col justify-center bg-gray-300 rounded-[1.5rem] overflow-hidden w-full h-full relative">
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
                      className="w-full h-auto object-cover rounded-lg sm:h-[300px]"
                    />
                    <div className="absolute top-2 left-2 z-10 flex items-center group">
                      <div className="flex justify-center mr-[-13px] items-center w-10 h-10 bg-blue-500 text-white rounded-full transition-all duration-300 group-hover:animate-ring group-hover:z-[-1]">
                        <img
                          className="h-5 w-5 object-contain"
                          src="/bell1.png"
                          alt="Notification Bell"
                          onMouseEnter={playSound}
                        />
                      </div>
                      <div className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-l-none rounded-r-lg -ml-[1px]">
                        Distance : 5 km
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-sm px-2 py-1 rounded-md z-20">
                      Price: {item.price}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md z-20">
                      Restaurant Name: {item.restaurantName}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md z-20">
                      Dish: {item.dishName}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-6 rounded-2xl bg-gray-100 shadow-md p-6 w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Dinner Bell
          </h2>
          <p className="text-center text-gray-600 text-base md:text-lg">
            Dinner Bell is a web app where food trucks and small restaurants can
            easily advertise specific dishes locally using YouTube. Explore
            various restaurants and dishes in your area with our demo ads
            section.
          </p>
          <Link
            href="/pages/login"
            className="flex items-center gap-3 rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition duration-300 hover:bg-green-400 md:text-base md:px-8 md:py-4"
          >
            <span>Log in</span>
            <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
      <footer className="flex justify-center py-4 bg-gray-200 shadow-inner">
        <p className="text-sm text-gray-600">Demo Ads</p>
      </footer>
    </main>
  );
}
