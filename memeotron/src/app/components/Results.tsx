'use client'

import { useState } from "react";
import Image from 'next/image';

export default function Results() {
  return (
    <div
      className="pt-12 items-center justify-items-center min-h-screen p-5 pb-10 font-[family-name:var(--font-geist-sans)]"
      style={{ backgroundImage: "url('/assets/mii_loading_gif.gif')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <h1 className="font-fredoka text-custom-blue text-95">Loading<span className="dot1">.</span><span className="dot2">.</span><span className="dot3">.</span></h1>
      <style jsx>{`
        @keyframes blink {
          0%, 20% { opacity: 0; }
          40% { opacity: 1; }
          60% { opacity: 0; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        .dot1 {
          animation: blink 1.4s infinite both;
        }
        .dot2 {
          animation: blink 1.4s infinite both;
          animation-delay: 0.2s;
        }
        .dot3 {
          animation: blink 1.4s infinite both;
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}