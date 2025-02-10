"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Meme } from "@/util/types";
import useSound from "use-sound";

interface ResultsProps {
  result: Meme;
  uploadedImage?: File | null;
}

export default function Results({ result, uploadedImage }: ResultsProps) {
  const [revealed, setRevealed] = useState(false);
  const [play] = useSound("/assets/sounds/vine_boom.mp3");

  // Conditionally show the meme name
  const displayedName = revealed ? result.imageName || "some meme" : "???";

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-8 px-4 bg-white">
      {/* Heading */}
      <h1 className="font-fredoka text-custom-blue text-4xl md:text-5xl text-center mb-8">
        You look like... <strong className="ml-2">{displayedName}</strong>
      </h1>

      {/* Side-by-side images */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
        {uploadedImage && (
          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 border-8 border-custom-blue rounded-md overflow-hidden">
              <Image
                src={URL.createObjectURL(uploadedImage)}
                alt="Your uploaded image"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* Matched meme (right) */}
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 border-8 border-custom-blue transition-colors hover:border-blue-700 rounded-md overflow-hidden">
            {!revealed && (
              <button
                onClick={() => {
                  play();
                  setRevealed(true);
                }}
                className="absolute inset-0 bg-custom-blue text-white text-lg font-medium 
             flex items-center justify-center hover:bg-blue-700 border hover:border-blue-700 border-custom-blue 
             transition-colors"
              >
                Reveal
              </button>
            )}
            {revealed && (
              <Image
                src={result.filePath}
                alt="Matched meme image"
                priority
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* "Go again" Button */}
      <div className="mt-8">
        {revealed && (
          <button
            onClick={() => window.location.reload()}
            className="inline-block px-10 py-4 bg-custom-blue text-white font-semibold rounded-[20px] shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-light focus:ring-opacity-75 transition duration-300 ease-in-out cursor-pointer font-fredoka text-xl"
          >
            Go again
          </button>
        )}
      </div>
    </div>
  );
}
