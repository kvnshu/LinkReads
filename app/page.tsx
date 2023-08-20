import Navbar from './nav'
export default function Home() {
    return (
        <div className="main ">
            <Navbar />
            <div id="homepage" className="min-h-screen px-32">
                <div id="hero-container" className="">
                    <div className="">
                        <h1 className="font-sans font-bold text-xl">A platform for digital readers</h1>
                        <h2 className="font-sans font-medium text-lg">Track what you read online, and see what your friends are reading</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
