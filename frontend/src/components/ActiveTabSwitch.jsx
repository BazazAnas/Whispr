import { useChatStore } from "../store/useChatStore";

const ActiveTabSwitch = () => {

    const { activeTab, setActiveTab } = useChatStore()

    return (
        <>
            <div className="tabs tab-box  m-2 justify-around">
                <button className={`tab ${activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"} px-12 rounded-3xl`}
                    onClick={() => setActiveTab("chats")}
                >
                    Chats
                </button>
                <button className={`tab ${activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"} px-12 rounded-3xl`}
                    onClick={() => setActiveTab("contacts")}
                >
                    Contacts
                </button>
            </div>
        </>
    )
}

export default ActiveTabSwitch