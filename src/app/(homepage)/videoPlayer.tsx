"use client";
import React, { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export const CustomVideoPlayer = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative aspect-video w-[40%]">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        onClick={togglePlay}
        poster="https://img.youtube.com/vi/HLGnkpZ-Q1Q/0.jpg"
      >
        <source src={src} type="video/mp4" />
        Fork It! After Movie
      </video>
      <button
        className="absolute right-4 top-4 z-10 rounded-full bg-black p-3 text-white transition-colors duration-300 hover:bg-gray-800"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause video" : "Play video"}
      >
        {isPlaying ? (
          <Pause size={20} className="fill-primary text-primary" />
        ) : (
          <Play size={20} className="fill-primary text-primary" />
        )}
      </button>
    </div>
  );
};

export default CustomVideoPlayer;
