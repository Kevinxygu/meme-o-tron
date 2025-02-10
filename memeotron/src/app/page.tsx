"use client";

import { useState } from "react";
import ImageInput from "./components/ImageInput";
import Image from "next/image";
import Landing from "./components/Landing";
import Loading from "./components/Loading";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
      // Implement API later here
    }
  };

  return (
    <div>
      <Landing />
    </div>
  );
}
