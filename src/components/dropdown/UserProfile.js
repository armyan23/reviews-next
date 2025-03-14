'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Cookies from "js-cookie";

import useComponentVisible from "@/hooks/useComponentVisible";
import { localUser } from "@/utils";

import profileImage from "@/../public/icons/profile-image.svg";

const UserProfile = () => {
    const router = useRouter()
    const { ref, isComponentVisible, setIsComponentVisible } =
        useComponentVisible(true);

    const userDetails = localUser();

    const signOut = (e) => {
        Cookies.remove('token');
        localStorage.clear();
        router.push("auth/login");
    }

    return (
        <div className="relative">
            <button
                id="dropdownUserButton" data-dropdown-toggle="dropdownAvatar"
                onClick={()=>setIsComponentVisible(prev=>!prev)}
                ref={ref}
                className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                type="button"
            >
                <span className="sr-only">Open user menu</span>
                <Image
                    priority
                    src={profileImage}
                    alt="profile-image"
                />
            </button>

            {isComponentVisible &&
                <ul role="menu" data-popover="profile-menu" data-popover-placement="bottom"
                    className="absolute right-0 z-10 flex min-w-[180px] flex-col gap-2 overflow-auto rounded-md border border-blue-gray-50 bg-white p-3 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
                    <div className="flex flex-col items-center text-center gap-4">
                        <Image
                            priority
                            src={profileImage}
                            alt="profile-image"
                            width={88}
                            height={88}
                        />

                        <div>
                            <p className="text-lg font-semibold">Hi there!</p>
                            <p className="font-medium text-[#4B5563]">{userDetails.email}</p>
                        </div>
                    </div>

                    <hr className="my-2 border-blue-gray-50" role="menuitem"/>

                    <div className="text-center">
                        <Link href="/dashboard/profile" className="text-sm font-semibold text-[#1C64F2] dark:text-blue-500 underline">See Details</Link>
                    </div>

                    <hr className="my-2 border-blue-gray-50" role="menuitem"/>

                    <button onClick={signOut} id="sign-out" role="menuitem" className="flex w-full cursor-pointer select-none items-center gap-2 rounded-md px-3 pt-[9px] pb-2 text-start leading-tight outline-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z" fill="#90A4AE"></path>
                        </svg>
                        <p className="block font-sans text-sm antialiased font-medium leading-normal text-inherit">
                            Sign Out
                        </p>
                    </button>
                </ul>
            }
        </div>
    )
}

export default UserProfile;
