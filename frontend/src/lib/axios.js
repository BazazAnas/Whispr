import axios from "axios";

export const axiosInstance = axios.create({
    baseURL : "https://whispr-304m.onrender.com/api",
    withCredentials: true,
})