"use client";
import Image from "next/image";
import { useState } from "react";
import { Meme } from "../util/types";

const sampleImage = "/ryan2.jpg";

export default function Home() {
  const [result, setResult] = useState<Meme | null>(null);

  const callMatchApi = async () => {
    try {
      const formData = new FormData();

      const imageResponse = await fetch(sampleImage);
      const imageBlob = await imageResponse.blob();
      formData.append("image", imageBlob, "image.jpg");

      const response = await fetch("/api/match", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to match image");
      }

      const data = await response.json();
      setResult(data.object);
      return data;
    } catch (error) {
      console.error("Error matching image:", error);
      throw error;
    }
  };

  return (
    <div className="grid grid-rows-[20px_auto_1fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>meme-o-tron</h1>
      <button
        onClick={callMatchApi}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Reveal
      </button>
      <div>
        <h2>
          You look like...{" "}
          <span className="font-bold text-2xl">
            {result?.imageName && result.imageName + "!!!!!!!"}
          </span>
        </h2>
        <div className="flex gap-8 items-center justify-center w-full">
          {/* Sample Image */}
          <div className="w-[300px] h-[300px] relative">
            <Image
              src={sampleImage}
              alt="sample"
              fill
              className="object-contain"
            />
          </div>
          {/* Result Image or Placeholder */}
          <div className="w-[300px] h-[300px] relative">
            {result?.filePath ? (
              <Image
                src={result.filePath}
                alt="result"
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gray-900 rounded-lg" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
