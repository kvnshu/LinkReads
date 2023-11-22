'use client'
import { useState } from 'react';
import { Button } from "@nextui-org/button";
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  function handleClick() {
    setIsLoading(true)
    router.push('/login');
    setIsLoading(false)
  }

  return (

    <div className="self-center">
      <Button 
        onPress={handleClick}
        color="primary"
        variant="flat"
        isLoading={isLoading}>
        Login
      </Button>
    </div>
  )
}