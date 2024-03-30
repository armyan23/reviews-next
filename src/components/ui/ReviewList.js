'use client'
import { useState } from "react";
import Image from 'next/image';
import moment from "moment";

import { getReviewsData } from "@/utils/requests";
import Loading from "@/components/ui/Loading";

import geolocation from "@/../public/icons/geolocation.svg";
import starFilled from "@/../public/icons/star-filled.svg";
import closeIcon from "@/../public/icons/close-icon.svg";
import googleG from "@/../public/icons/google-g.svg";
import star from "@/../public/icons/star.svg";

const ReviewList = ({ reviewsDetails, closeReviewWindow }) => {
    const [reviews, setReviews] = useState(reviewsDetails.data[0].reviews_data)
    const [lazyLoading, setLazyLoading] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    const showMoreUsers = () => {
        setLazyLoading(true)

        getReviewsData(reviewsDetails.user.id, reviews.at(-1).review_pagination_id).then(res=>{
            setLazyLoading(false)
            setReviews(prev => [...prev, ...res.data.data.data[0].reviews_data])

            if (!res.data.data.data[0].reviews_data.length) {
                setIsFinished(true)
            }
        }).catch((e)=>console.log(e))
    }

    return (
        <div className="w-1/2 bg-white p-6">
            <div className="flex justify-between">
                <div className="w-3/4">
                    <p className="text-lg font-semibold mb-1.5">{reviewsDetails.user.companyName}</p>
                    <div className="flex gap-1 text-sm font-medium">
                        <Image
                            priority
                            src={geolocation}
                            alt="geolacation"
                            width={15}
                            height={15}
                        />
                        <p className="truncate">
                            {reviewsDetails.user.companyAddress}
                        </p>
                    </div>
                </div>
                <div className="w-12 h-12 flex justify-center items-center">
                    <button
                        className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs text-gray-900 hover:bg-gray-900/10 active:bg-gray-900/20 rounded-full"
                        type="button" onClick={closeReviewWindow}>
                                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                    <Image
                                        priority
                                        src={closeIcon}
                                        alt="close-icon"
                                    />
                                </span>
                    </button>
                </div>
            </div>
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700"/>
            <div className="review-content-height pr-2.5 custom-scroll content-baseline overflow-auto">
                {reviews.map((item) => (
                    <div key={item.id} className="mb-8">
                        <div className="flex justify-between">
                            <div className="flex gap-3.5 mb-4 items-center">
                                <img
                                    src={item.author_image}
                                    alt="profile-image"
                                    width={40}
                                    height={40}
                                    className="h-fit"
                                />
                                <div>
                                    <p className="text-sm font-semibold mb-1 md:mb-2">{item.author_title}</p>
                                    <div className="flex">
                                        <Image
                                            priority
                                            src={googleG}
                                            alt="google-g"
                                            className="mr-3"
                                            width={15}
                                            height={15}
                                        />
                                        <div className="flex gap-1">
                                            {new Array(Math.round(item.review_rating)).fill(1).concat([0,0,0,0,0]).slice(0,5).map((item, index)=>(
                                                <Image
                                                    key={index}
                                                    priority
                                                    src={item ? starFilled : star}
                                                    alt="star-filled"
                                                    width={15}
                                                    height={15}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="font-medium text-xs text-[#4B5563]">
                                {moment(item.review_datetime_utc).fromNow(true)} ago
                            </div>
                        </div>
                        <p className="text-[#4B5563] text-sm">{item.review_text}</p>
                    </div>
                ))}

                {lazyLoading ? <Loading /> :
                    !isFinished && (
                        <button onClick={showMoreUsers} className="block m-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Show more
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default ReviewList;