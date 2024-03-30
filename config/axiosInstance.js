import axios from "axios";
import config from "./config";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL : config.apiUrl,
    headers: {},
});

axiosInstance.interceptors.request.use(
    (config) => {
        try {
            const token = Cookies.get('token');

            if (token){
                config.headers = {
                    Authorization: `Bearer ${token}`,
                };
            }

            return config;
        } catch (e) {
            console.log(e);
        }
    },
    (error) => {
        Promise.reject(error);
    }
);

export default axiosInstance;