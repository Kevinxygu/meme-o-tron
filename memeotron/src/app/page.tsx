"use client";

import React, { useState } from "react";
import Image from "next/image";
import Landing from "./components/Landing";
import Loading from "./components/Loading";
import { Meme } from "@/util/types";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<Meme | null>(null);
  const [page, setPage] = useState<"landing" | "loading" | "results">("landing");

  const callMatchApi = async (file: File) => {
    setImage(file);
    setPage("loading"); // <-- Immediately switch to loading page

    try {
      const formData = new FormData();
      formData.append("image", file, "image.jpg");

      const response = await fetch("/api/match", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to match image");
      }

      const data = await response.json();
      setResult(data.object);

      // If the response succeeds and we have our data:
      setPage("results");
    } catch (error) {
      console.error("Error matching image:", error);
      // Optionally handle errors (maybe setPage back to "landing"?)
      setPage("landing");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* LANDING PAGE */}
      {page === "landing" && (
        <Landing onImageChange={callMatchApi} />
      )}

      {/* LOADING PAGE */}
      {page === "loading" && (
        <Loading />
      )}

      {/* RESULTS PAGE */}
      {page === "results" && result && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* If you also want to display the uploaded image: */}
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
              </div>
            )}

            {/* Show the match result */}
            <div className="mt-6 p-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold">Result:</h2>
              <div className="relative w-full h-64 mt-4">
                <Image
                  src={result.filePath}
                  alt="Result image"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
