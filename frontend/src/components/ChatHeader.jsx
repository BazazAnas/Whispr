import { XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";

const ChatHeader = () => {

    const { selectedUser, setSelectedUser } = useChatStore()

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setSelectedUser(null)
            }
        }
        window.addEventListener("keydown", handleEsc)
        return () => {
            window.removeEventListener("keydown", handleEsc)
        }
    }, [setSelectedUser])


    return (
        <>
            <div className="flex items-center justify-between bg-slate-800/50 border-b-2 border-slate-400/50 max-h-21 px-6 flex-1 py-2">
                <div className="flex items-center space-x-3">
                    <div className=" avatar avatar-online">
                        <div className="w-12 rounded-full">
                            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-slate-200 font-medium">{selectedUser.fullName.charAt(0).toUpperCase() + selectedUser.fullName.slice(1)}</h3>
                        <p className="text-slate-400 text-sm">Online</p>
                    </div>
                </div>
                <div>
                    <button onClick={() => setSelectedUser(null)}>
                        <XIcon className="w-5 h-5 text-slate-500 hover:text-red-400 transition-colors cursor-pointer" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default ChatHeader