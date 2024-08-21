import Spline from "@splinetool/react-spline/next";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function LandingPage() {
  return (
    <div id="hero" className="h-5/6 w-5/6 flex items-center justify-center">
      <div className="w-96 flex flex-col items-center justify-center align-center">
        <h1 className="text-left w-full pb-4 font-sans font-bold text-xl">
          Goodreads for internet articles
        </h1>
        <h2 className="text-left w-full pb-4 self-start font-sans font-medium ">
          Keep track of what you want to read, and see what your friends are
          reading
        </h2>
        <div className="items-start w-full">
          <GoogleLoginButton />
        </div>
      </div>
      <div>
        <Spline scene="https://prod.spline.design/UUARGvfn-O7JcJK5/scene.splinecode" />
      </div>
    </div>
  );
}
