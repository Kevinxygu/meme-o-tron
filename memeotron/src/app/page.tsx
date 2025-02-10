"use client";

import React, { useState } from "react";
import Image from "next/image";
import Landing from "./components/Landing";
import Loading from "./components/Loading";
import { Meme } from "@/util/types";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<Meme | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const callMatchApi = async (file: File) => {
    setImage(file);

<<<<<<< Updated upstream
  const callMatchApi = async (e: React.ChangeEvent<HTMLInputElement>) => {
=======
>>>>>>> Stashed changes
    try {
      const formData = new FormData();
      formData.append("image", file, "image.jpg");

      const response = await fetch("/api/match", {
        method: "POST",
        body: formData,
      });
      setLoading(true);

      if (!response.ok) {
        throw new Error("Failed to match image");
      }

      const data = await response.json();
      setResult(data.object);
      return data;
    } catch (error) {
      console.error("Error matching image:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Landing onImageChange={callMatchApi} />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {image && (
            <div className="mt-6">
              <div className="relative w-full h-64">
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Uploaded image"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              {loading ? "Processing..." : "Match Image"}
            </div>
          )}

          {loading && <Loading />}

          {result && (
            <div className="mt-6 p-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold">Result:</h2>
              <Image
                src={result.filePath}
                alt="Result image"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}