import LogoutButton from './LogoutButton'
import LoginButton from './LoginButton'


export default async function Header({ user }) {
  return (
    <nav className="w-full flex justify-center h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground border border-2" >
        {user ? (
          <div className="flex items-center gap-4">
            Hey, {user.email}!
            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </nav>
  )
}