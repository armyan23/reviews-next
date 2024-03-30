'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { toast, ToastContainer } from "react-toastify";

import axiosInstance from "@/../config/axiosInstance";
import { localUser } from "@/utils";

export default function SignUp() {
    const router = useRouter();
    const formRef = useRef();

    const [isDisabled, setIsDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const userDetails = localUser();

    useEffect(() => {
        if (Object.keys(userDetails).length) {
            setIsDisabled(!userDetails.activatedTime)
            formRef.current.firstName.value = userDetails.firstName;
            formRef.current.lastName.value = userDetails.lastName;
            formRef.current.googleReviews.checked = !!userDetails.activatedTime;
            formRef.current.companyName.value = userDetails.companyName;
            formRef.current.companyAddress.value = userDetails.companyAddress;
        }
    }, []);

    const updateDetails = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            googleReviews: !isDisabled,
            companyName: e.target.companyName.value,
            companyAddress: e.target.companyAddress.value,
        }

        const data = await axiosInstance.put('update-personal-details', payload).catch(error => {
            toast.error(error.response?.data?.error?.message || error.message, {
                position: "top-right"
            });
        });

        if (data?.status === 200) {
            toast.success(data.data.message, {
                position: "top-right"
            });
            const user = JSON.parse(localStorage.getItem("user"));
            localStorage.setItem("user", JSON.stringify({...user, ...data.data.data}));
            router.push("/dashboard");
        }
        setLoading(false)
    }

    const switcher = () => {
        formRef.current.companyName.value = '';
        formRef.current.companyAddress.value = '';
        setIsDisabled(prev => !prev);
    }

    return (
        <main className="flex flex-col items-center justify-between p-12">
            <p className="text-3xl text-center pb-12">Profile Details</p>
            <form ref={formRef} onSubmit={(e) => updateDetails(e)}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            First name
                        </label>
                        <input
                            type="text" id="firstName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Last name
                        </label>
                        <input
                            type="text" id="lastName"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Doe"
                        />
                    </div>
                </div>
                <div className="mb-7 flex align-text-top gap-5">
                    <label className="relative inline-flex cursor-pointer items-center">
                        <input onClick={switcher} id="googleReviews" defaultChecked={!isDisabled} type="checkbox" className="peer sr-only"/>
                        <label htmlFor="googleReviews" className="hidden"></label>
                        <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                    </label>
                    <p>Sync google reviews</p>
                </div>
                <div className="mb-6">
                    <label htmlFor="companyName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Company Name
                    </label>
                    <input
                        type="text" id="companyName"
                        className="bg-gray-50 disabled:bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Company"
                        disabled={isDisabled}
                        required={!isDisabled}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="companyAddress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Company Address
                    </label>
                    <input
                        type="text" id="companyAddress"
                        className="bg-gray-50 disabled:bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Address"
                        disabled={isDisabled}
                        required={!isDisabled}
                    />
                </div>
                <button type="submit" disabled={loading} className={`${loading ? 'bg-gray-500 hover:bg-gray-600' : 'bg-blue-700 hover:bg-blue-800'} block m-auto text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
                    Submit
                </button>
            </form>

            <ToastContainer/>
        </main>
    );
}
