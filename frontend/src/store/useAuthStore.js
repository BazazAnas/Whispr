import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client"

const BASE_URL = "http://localhost:3000"

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIN: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket()
        } catch (error) {
            console.log("Error in Auth Check", error);
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signUp: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("auth/signup", data)
            set({ authUser: res.data });

            toast.success('Account Created Successfully!');

            get().connectSocket()
        } catch (error) {
            console.log("error in Signing Up", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (data) => {
        set({ isLoggingIN: true })
        try {
            const res = await axiosInstance.post("auth/login", data)
            set({ authUser: res.data });
            toast.success('Account Logged In');
        } catch (error) {
            console.log("error in Logging in", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false })
        }

        get().connectSocket()
    },

    logout: async () => {
        try {
            await axiosInstance.post("auth/logout");
            set({ authUser: null })
            toast.success("Successfully logged out");
            get().disconnectSocket()
        } catch (error) {
            console.log("error in Logging out", error);
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        try {
            await axiosInstance.put("auth/update-profile", data)
            toast.success("Profile picture updated successfully")
        } catch (error) {
            console.log("error in update profile", error);
            toast.error("Error updating profile picture");
        }
    },

    connectSocket: () => {
        const { authUser } = get()

        if (!authUser || get().socket?.connected) {
            return
        }

        const socket = io(BASE_URL, {
            withCredentials: true,
        })

        socket.connect()

        set({ socket })

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        })
    },

    disconnectSocket: () => {
        if (get().socket.connected) get().socket.disconnect()
    }
}))