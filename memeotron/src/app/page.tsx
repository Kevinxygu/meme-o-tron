'use client'

import { useState } from "react";
import ImageInput from "./components/ImageInput";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      // Implement API later here
    }
  };

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{ backgroundImage: "url('/assets/landingBackground.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h1 className="mt-64 font-fredoka text-custom-blue text-95">MEME-O-TRON</h1>
      <ImageInput onImageChange={handleImageChange} />
    </div>
  );
}