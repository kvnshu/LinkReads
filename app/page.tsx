import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import Dashboard from './dashboard'
import HomePage from './home'

export default async function Home() {
    const session = await getServerSession(options)
    return (
        <div className="min-h-screen px-32">
            {
                session ? (
                    <Dashboard/>
                ) : (
                    <HomePage/>
                )}
            
        </div>
    )
}
