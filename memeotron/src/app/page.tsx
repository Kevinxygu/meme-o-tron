// app/page.tsx
"use client";

import React, { useState } from "react";
import Landing from "./components/Landing";
import Loading from "./components/Loading";
import Results from "./components/Results"; // <-- Import the new Results component
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
      // Optionally handle errors (e.g., setPage("landing") to go back?)
      setPage("landing");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {/* LANDING PAGE */}
      {page === "landing" && <Landing onImageChange={callMatchApi} />}

      {/* LOADING PAGE */}
      {page === "loading" && <Loading />}

      {/* RESULTS PAGE */}
      {page === "results" && result && (
        <Results result={result} uploadedImage={image} />
      )}
    </main>
  );
}
