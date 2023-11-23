import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Messages from './messages'
import ArrowBack from "@/app/public/arrow_back.svg"
import LogoPrimary from '@/components/LogoPrimary';

function SearchBarFallback() {
  return <>Loading...</>
}

export default function Login() {
  return (
    <main className="flex-1 flex flex-col justify-center place-items-center w-screen px-8">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <Image
          priority
          src={ArrowBack}
          alt="Back"
          className="transition-transform group-hover:-translate-x-1"
        />
        <span
          className="align-middle"
        >
          Back
        </span>
      </Link>
      <div id="form-container" className="flex-1 flex flex-col place-items-center min-w-[30%] py-32 gap-2">
        <LogoPrimary />
        <form
          className="flex-1 flex flex-col w-full justify-center gap-4 text-foreground"
          action="/auth/sign-in"
          method="post"
        >
          <Input
            type="email"
            label="Email"
            name="email"
            isRequired
          />
          <Input
            label="Password"
            type="password" // {isVisible ? "text" : "password"}
            name="password"
            isRequired
          />
          <div
            className="flex flex-1 flex-col gap-2"
          >
            <Button
              color="primary"
              variant="solid"
              type="submit"
            >
              Sign In
            </Button>
            <Button
              formAction="/auth/sign-up"
              color="default"
              variant="ghost"
              type="submit"
            >
              Sign Up
            </Button>
          </div>
          <Suspense fallback={<SearchBarFallback />}>
            <Messages />
          </Suspense>
        </form>
      </div>
    </main>

  )
}
