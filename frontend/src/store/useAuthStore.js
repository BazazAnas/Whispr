import { create } from "zustand";

export const useAuthStore = create((set) => ({
    authUser: { name: "anas", _id: 1 },
    isLoggedIn: false,
    isLoading: false,

    login : () => {
        set({isLoggedIn:true,isLoading:true})
    }
}))