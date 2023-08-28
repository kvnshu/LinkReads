import LoginBtn from './login'

export default function Navbar() {
    return (
        <nav className="bg-white">
            <div className="max-w-4xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/">
                    <h1 className="font-serif font-bold text-5xl">LinkReads</h1>
                </a>
                <LoginBtn />
            </div>
        </nav>
    )
}