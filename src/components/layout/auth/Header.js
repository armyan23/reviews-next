import Link from "next/link";

const Header = () =>{
    return (
        <div className="flex justify-end px-16 py-7 mb-5 bg-white">
            <Link href="/auth/login">Sign in</Link> / <Link href="/auth/sign-up">Sign up</Link>
        </div>
    )
}

export default Header