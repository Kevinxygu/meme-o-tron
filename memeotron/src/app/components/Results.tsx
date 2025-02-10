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
  // State to track whether the meme info is revealed
  const [revealed, setRevealed] = useState(false);
  const [play] = useSound("/assets/sounds/vine_boom.mp3");

  // Conditionally show the meme name
  const displayedName = revealed ? result.imageName || "some meme" : "???";

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-8 px-4 bg-white">
      {/* Heading: "you look like... ???" until revealed */}
      <h1 className="font-fredoka text-custom-blue text-4xl md:text-5xl text-center mb-8">
        you look like... <strong className="ml-2">{displayedName}</strong>
      </h1>

      {/* Side-by-side images */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
        {/* 1) Uploaded image (left) */}
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
            {/* Optional caption below the image */}
            {/* <p className="text-sm mt-2 text-gray-600">Your Photo</p> */}
          </div>
        )}

        {/* 2) Matched meme (right side) */}
        <div className="flex flex-col items-center">
          <div className="relative w-64 h-64 border-8 border-custom-blue rounded-md overflow-hidden">
            {/* If NOT revealed, show a "Reveal" button that covers the image area */}
            {!revealed && (
              <button
                onClick={() => {
                  play();

                  setRevealed(true);
                }}
                className="absolute inset-0 bg-custom-blue text-white text-lg font-medium flex items-center justify-center hover:bg-blue-700 hover:border-blue-700 transition-colors"
              >
                Reveal
              </button>
            )}
            {/* If revealed, show the meme image */}
            {revealed && (
              <Image
                src={result.filePath}
                alt="Matched meme image"
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
