'use client'
import { useEffect, useState } from "react";
import Image from 'next/image';

import Loading from "@/components/ui/Loading";
import { getUsers } from "@/utils/requests";

import profileImage from "@/../public/icons/profile-image.svg";
import arrowRight from "@/../public/icons/arrow-right.svg";

const UserList = ({ getReviews, reviewsDetails }) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [lazyLoading, setLazyLoading] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (page){
            getUsers(page).then(res => {
                if (res?.data?.data?.length) {
                    setUsers(prev => [...prev, ...(res?.data?.data || [])])
                } else {
                    setPage(null)
                }
                setLoading(false)
                setLazyLoading(false)
            })
        }
    }, [page]);

    const showMoreUsers = () => {
        setPage(prev=> ++prev)
        setLazyLoading(true)
    }

    return (
        <ul className={`${!!Object.keys(reviewsDetails).length ? 'w-1/2' : 'w-full'} pb-3 grid gap-4 pr-2.5 content-height custom-scroll content-baseline overflow-auto`}>
            {loading && <Loading />}

            {users.map((user, index) => (
                <li key={index} className={`${user.id === reviewsDetails.user?.id ? "border-[#1C64F2] border-2" : ""} h-fit p-2.5 bg-white rounded-md`}>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                            <Image
                                priority
                                src={profileImage}
                                alt="profile-image"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {user.email}
                            </p>
                        </div>
                        <button
                            className="relative align-middle select-none font-sans font-medium text-center uppercase disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs text-gray-900 hover:bg-gray-900/10 rounded-full"
                            type="button" onClick={() => getReviews(user)}>
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    <Image
                                        priority
                                        src={arrowRight}
                                        alt="arrow-right"
                                    />
                                </span>
                        </button>
                    </div>
                </li>
            ))}

            {lazyLoading ? <Loading /> :
                page && (
                    <button onClick={showMoreUsers} className="block m-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Show more
                    </button>
                )
            }
        </ul>
    )
}

export default UserList;