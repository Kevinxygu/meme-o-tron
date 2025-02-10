"use client";
import Image from "next/image";
import { useState } from "react";
import ImageInput from "./components/ImageInput";      
import Landing from "./components/Landing";
import Loading from "./components/Loading"
import { Meme } from "../util/types";

const sampleImage = "/ryan2.jpg";

export default function Home() {
  const [result, setResult] = useState<Meme | null>(null);
  const [image, setImage] = useState<File | null>(null);
    

  const callMatchApi = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      
      if (e.target.files && e.target.files.length > 0) {
        setImage(e.target.files[0]);
      }

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
    <div>
      <Landing />
    </div>
  );
}