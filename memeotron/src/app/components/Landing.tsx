"use client";

import { useState } from "react";
import ImageInput from "./ImageInput";
import Image from "next/image";

export default function Landing({ onImageChange }: any) {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <div
      className="pt-36 items-center font-semibold justify-items-center min-h-screen p-5 pb-10 font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundImage: "url('/assets/landingBackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="font-fredoka text-custom-blue text-95">MEME-O-TRON</h1>
      <div className="mt-8">
        <ImageInput onImageChange={handleImageChange} />
      </div>
      <Image
        src="/assets/pointer_gif.gif"
        alt="Spiderman pointing meme"
        width={500}
        height={500}
        className="mt-8"
      />
    </div>
  );
}
