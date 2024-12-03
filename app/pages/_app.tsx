"use client";
import { useEffect } from "react";
import { AppProps } from "next/app";
import { initGA } from "../lib/ga"; // Make sure this points to your `ga.ts` file

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize Google Analytics only once when the app mounts
    initGA();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
