"use client";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// Define the type for coordinates
interface Coordinates {
  lat: number;
  lng: number;
}

interface User {
  id: string;
  lat: number;
  lng: number;
  email: string;
}

const TheSesionOne = () => {
  const { data: session } = useSession();
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const { setUserData } = useAuth();
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userCoords);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    const saveUserEmailAndLocation = async () => {
      if (session?.user?.email && userLocation) {
        try {
          console.log("Request Payload:", {
            email: session.user.email,
            lat: userLocation.lat,
            lng: userLocation.lng,
          });
          const response = await axios.post<{ existingUser: User }>(
            "/api/registre",
            {
              email: session.user.email,
              lat: userLocation.lat,
              long: userLocation.lng,
            }
          );

          console.log(
            "User email and location saved successfully:",
            response.data
          );
          setUserData(response.data.existingUser);
        } catch (error) {
          console.error("Error saving user email and location:", error);
        }
      }
    };

    saveUserEmailAndLocation();
  }, [session?.user?.email, userLocation, setUserData]);

  return <div></div>;
};

export default TheSesionOne;
