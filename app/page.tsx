import { options } from "./api/auth/[...nextauth]/options"
import LoginBtn from './login'
import { getServerSession } from "next-auth/next"
import Dashboard from './dashboard'

export default async function HomePage() {
    const session = await getServerSession(options)
    // console.log(session)
    return (
        <div className="min-h-screen px-32">
            {
                session ? (
                    <Dashboard/>
                ) : (
                    <div id="hero">
                        <div id="hero-container" className="">
                            <div className="">
                                <h1 className="font-sans font-bold text-xl">A platform for digital readers</h1>
                                <h2 className="font-sans font-medium text-lg">Track what you read online, and see what your friends are reading</h2>
                            </div>
                            <LoginBtn/>
                        </div>
                    </div>
                )}
            
        </div>
    )
}
