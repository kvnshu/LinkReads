import Image from 'next/image'
import Logo from '@/app/public/LinkReads-logo.svg'
import Link from 'next/link'

export default function LogoPrimary() {
  return (
    <Link
      href="/"
    >
      <Image
        priority
        src={Logo}
        alt="LinkReads Logo"
      />
    </Link>
  )
}
