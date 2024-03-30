'use client';
import { useRouter } from "next/navigation";

import { toast, ToastContainer } from "react-toastify";
import Cookies from 'js-cookie';

import axiosInstance from "@/../config/axiosInstance";

export default function Login() {
    const router = useRouter()

    const signUp = async (e) => {
        e.preventDefault()

        const payload = {
            identifier: e.target.email.value,
            password: e.target.password.value,
        }
        const data = await axiosInstance.post('auth/local', payload).catch(error => {
            toast.error(error.response?.data?.error?.message || error.message, {
                position: "top-right"
            });
        });

        if (data?.status === 200) {
            localStorage.setItem('user', JSON.stringify(data.data.user));
            Cookies.set('token', data.data.jwt);
            router.push("dashboard");
        }
    }

    return (
        <main className="flex flex-col items-center justify-between p-12">
            <div>
                <p className="text-3xl text-center pb-12">Sign In</p>
                <form onSubmit={(e) => signUp(e)}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email address
                        </label>
                        <input
                            type="email" id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="john.doe@company.com" required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input
                            type="password" id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="•••••••••" required
                        />
                    </div>

                    <button type="submit" className="block m-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Submit
                    </button>
                </form>
            </div>
            <ToastContainer />
        </main>
    );
}
