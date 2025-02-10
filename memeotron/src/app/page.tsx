// app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Landing from "./components/Landing";
import Loading from "./components/Loading";
import Results from "./components/Results";
import { Meme } from "@/util/types";
import useSound from "use-sound";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<Meme | null>(null);
  const [page, setPage] = useState<"landing" | "loading" | "results">(
    "landing"
  );
  const [playKahoot, { stop: stopKahoot }] = useSound(
    "/assets/sounds/kahoot_lobby.mp3",
    {
      loop: true,
      volume: 0.5,
      soundEnabled: true,
      interrupt: true,
    }
  );

  const [playMii, { stop: stopMii }] = useSound("/assets/sounds/mii.mp3", {
    loop: true,
    volume: 0.5,
    soundEnabled: true,
    interrupt: true,
  });

  useEffect(() => {
    const playSound = async () => {
      try {
        // Stop both sounds first
        stopKahoot();
        stopMii();

        // Play the appropriate sound based on the page
        if (page === "landing") {
          await playKahoot();
        } else if (page === "loading") {
          await playMii();
        }
      } catch (error) {
        console.error("Failed to play sound:", error);
      }
    };

    playSound();
    return () => {
      stopKahoot();
      stopMii();
    };
  }, [page, playKahoot, stopKahoot, playMii, stopMii]);

  const callMatchApi = async (file: File) => {
    setImage(file);
    setPage("loading");

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

      setPage("results");
    } catch (error) {
      console.error("Error matching image:", error);
      setPage("landing");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      {page === "landing" && <Landing onImageChange={callMatchApi} />}

      {page === "loading" && <Loading />}

      {page === "results" && result && (
        <Results result={result} uploadedImage={image} />
      )}
    </main>
  );
}
