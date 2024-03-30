'use client'

import UserProfile from "@/components/dropdown/UserProfile";
import { useRouter } from "next/navigation";

const Header = () =>{
    const router = useRouter()

    return (
        <div className="flex justify-between px-16 py-7 mb-5 bg-white items-center">
            <div onClick={()=> router.push("/dashboard")} className="cursor-pointer">Company</div>
            <UserProfile />
        </div>
    )
}

export default Header