import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";



export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({ isSoundEnabled: !get().isSoundEnabled });
    },

    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("message/contact");
            set({ allContacts: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMyChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/chats");
            set({ chats: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true })
        try {
            const res = await axiosInstance.get(`message/${userId}`);
            set({ messages: res.data })
        } catch (error) {
            console.log("Error in fetching Message", error)
            toast.error("Error in fetching Message")
        } finally {
            set({ isMessagesLoading: false })
        }
    },

    sendMessage: async (msgData) => {
        const { selectedUser, messages } = get();

        const { authUser } = useAuthStore.getState();
        const tempId = `temp-${Date.now()}`;

        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            receiverId: selectedUser._id,
            text: msgData.text,
            image: msgData.image,
            createdAt: new Date().toString(),
            isOptimistic: true,
        }
        set({ messages: [...messages, optimisticMessage] });
        try {
            const res = await axiosInstance.post(`message/send/${selectedUser._id}`, msgData)
            set({ messages: messages.concat(res.data) })
        } catch (error) {
            set({ messages: messages })
            toast.error(error.response.data.message)
        }
    },

    listenToMessages: () => {
        const { selectedUser, isSoundEnabled } = get();
        if (!selectedUser) {
            return
        }

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
            if (isMessageSentFromSelectedUser) return;

            const currentMessage = get().messages
            set({ messages: [...currentMessage, newMessage] })
        })

        if (isSoundEnabled) {
            const notificationSound = new Audio("/sounds/notification.mp3");

            notificationSound.currentTime = 0; // reset to start
            notificationSound.play().catch((e) => console.log("Audio play failed:", e));
        }
    },

    noListenToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    }
}))