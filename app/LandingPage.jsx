import React from "react";
import LoginButton from "../components/LoginButton";

export default function LandingPage() {
  return (
    <div id="hero" className="pb-32 flex flex-col justify-center align-center">
      <h1 className="self-center pb-4 font-sans font-bold text-xl">Goodreads for internet articles</h1>
      <h2 className="self-center pb-6
       font-sans font-medium ">Keep track of what you read online, and see what your friends are reading</h2>
      <LoginButton />
    </div>
  )
}