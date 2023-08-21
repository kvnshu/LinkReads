import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth/next"
import Login from './login'

export default async function HomePage() {
    const session = await getServerSession(options)

    return (
        <>
            {
                session ? (
                    <div className="min-h-screen px-32">
                        <h1>User Home</h1>
                        <Login/>
                    </div>
                ) : (
                    <div id="homepage" className="min-h-screen px-32">
                        <div id="hero-container" className="">
                            <div className="">
                                <h1 className="font-sans font-bold text-xl">A platform for digital readers</h1>
                                <h2 className="font-sans font-medium text-lg">Track what you read online, and see what your friends are reading</h2>
                            </div>
                            <Login/>
                        </div>
                    </div>
                )}
        </>
    )
}
