import axiosInstance from "@/../config/axiosInstance";

export const getUsers = async (page = 1) => {
    return await axiosInstance.get(`users?page=${page}`).catch(error => {
      console.log(error)
    });
}

export const getReviewsData = async (id, page = null) => {
    let apiUrl = `google-reviews/${id}` + (page? `?page=${page}` : '');

    return await axiosInstance.get(apiUrl).catch(error => {
        console.log(error)
    });
}