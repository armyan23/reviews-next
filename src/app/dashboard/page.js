'use client';
import { useState } from "react";

import UserList from "@/components/ui/UserList";
import { getReviewsData } from "@/utils/requests";
import ReviewList from "@/components/ui/ReviewList";
import Loading from "@/components/ui/Loading";

export default function Dashboard() {

    const [reviewsDetails, setReviewsDetails] = useState({})
    const [loading, setLoading] = useState(false)


    const getReviews = (user) => {
        setReviewsDetails({})
        setLoading(true)
        getReviewsData(user.id).then(res=>{
            setLoading(false)
            setReviewsDetails({...res.data.data, user})
        }).catch((e)=>console.log(e))
    }

    const closeReviewWindow = () => {
        setReviewsDetails({})
    }


    return (
        <main className="flex flex-col pl-16">
            <div className="flex grid-cols-4 gap-2.5 h-screen-[]">
                <UserList getReviews={getReviews} reviewsDetails={reviewsDetails}/>

                {loading ? <Loading /> : !!Object.keys(reviewsDetails).length &&
                    <ReviewList reviewsDetails={reviewsDetails} closeReviewWindow={closeReviewWindow}/>
                }
            </div>
        </main>
    );
}
