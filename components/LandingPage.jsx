import React from "react";
import LoginButton from "./LoginButton";

export default function LandingPage() {
  return (
    <div id="hero" className="flex mt-48 items-center justify-center ">
      <div id="hero-container">
        <div>
          <p className="text-6xl font-semibold">Goodreads for internet articles</p>
          <p className="text-lg">Keep track of what you read online, and see what your friends are reading</p>
        </div>
        <LoginButton />
      </div>
    </div>
  )
}