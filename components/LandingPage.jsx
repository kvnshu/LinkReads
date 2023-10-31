import React from "react";
import LoginButton from "./LoginButton";

export default function LandingPage() {
  return (
    <div id="hero">
      <div id="hero-container" className="">
        <div className="">
          <h1 className="font-sans font-bold text-xl">Goodreads for internet articles</h1>
          <h2 className="font-sans font-medium text-lg">Keep track of what you read online, and see what your friends are reading</h2>
        </div>
        <LoginButton />
      </div>
    </div>
  )
}