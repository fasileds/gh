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
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex flex-col h-16 md:h-48 shrink-0 justify-between rounded-b-3xl bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 px-6 md:px-16 shadow-2xl">
        <div className="flex items-center justify-between pt-4 md:pt-8">
          <div className="flex items-center gap-4">
            <AcmeLogo />
          </div>
          <Link
            href="/pages/signUp"
            className="flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-700 shadow-lg transition-all duration-300 hover:bg-green-50 hover:shadow-2xl md:px-8 md:py-4 md:text-base"
          >
            <span>Create Account</span>
            <ArrowRightIcon className="w-5 md:w-6 text-green-600" />
          </Link>
        </div>
      </header>

      <div className="flex grow flex-col gap-8 px-6 py-10 md:px-12 md:py-16 items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center gap-8 rounded-2xl bg-white shadow-xl p-6 w-[375px] h-[700px] border border-gray-300 relative">
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-2 rounded-full bg-gray-200"></div>
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-1 rounded-full bg-gray-300"></div>
            <img
              className="absolute top-4 left-4 h-10 w-10 object-contain cursor-pointer transition-transform duration-200 hover:scale-110 transform origin-top animate-ring"
              src="/bell1.png"
              alt="Notification Bell"
            />
            <div className="flex flex-col justify-center bg-gray-300 rounded-[1.5rem] overflow-hidden w-full h-full">
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
                    {/* Image */}
                    <Image
                      src={item.src}
                      width={375}
                      height={600}
                      alt={`Dish ${index + 1}`}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-sm px-2 py-1 rounded-md">
                      Distance: {item.distance}
                    </div>
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-sm px-2 py-1 rounded-md">
                      Price: {item.price}
                    </div>
                    <div className="absolute bottom-2 left-2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md">
                      Name: {item.restaurantName}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md">
                      Dish: {item.dishName}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-gray-300 rounded-full"></div>
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
