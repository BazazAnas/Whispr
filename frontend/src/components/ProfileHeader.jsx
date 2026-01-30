import { useRef, useState } from 'react'
import { useChatStore } from "../store/useChatStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3")

const ProfileHeader = () => {

    const { logout, authUser, updateProfile } = useAuthStore()
    const { isSoundEnabled, toggleSound } = useChatStore()
    const fileInputRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = async () => {
            const base64Image = reader.result;
            setSelectedImage(base64Image);
            await updateProfile({ profilePic: base64Image });
        }
    }

    return (
        <>
            <div className='p-6 border-b border-slate-700/60'>
                <div className='flex items-center justify-between'>
                    <div className=' flex items-center gap-3'>

                        {/*Avatar*/}
                        <div className="avatar avatar-online ">
                            <button onClick={() => fileInputRef.current.click()} className=' size-14 relative group  overflow-hidden  rounded-full'>
                                <img src={selectedImage || authUser.profilePic || "/avatar.png"} alt="User Image" className=' size-full object-cover' />
                                <div className='absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity'>
                                    <span className='text-white text-xs'>Change</span>
                                </div>
                            </button>
                            <input
                                type="file"
                                accept='image/*'
                                ref={fileInputRef}
                                className=' hidden'
                                onChange={handleImageUpload}
                            />
                        </div>

                        { /*  User Name*/}
                        <div>
                            <h3 className=' text-slate-200 text-base font-medium max-w-40 truncate'>
                                {authUser.fullName}
                            </h3>
                            <p className='text-slate-500 text-xs'>
                                online
                            </p>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className='flex gap-4 items-center'>
                        <button
                            className="text-slate-400 hover:text-slate-200 transition-colors"
                            onClick={logout}
                        >
                            <LogOutIcon className="size-5" />
                        </button>

                        {/* SOUND TOGGLE BTN */}
                        <button
                            className="text-slate-400 hover:text-slate-200 transition-colors"
                            onClick={() => {
                                // play click sound before toggling
                                mouseClickSound.currentTime = 0; // reset to start
                                mouseClickSound.play().catch((error) => console.log("Audio play failed:", error));
                                toggleSound();
                            }}
                        >
                            {isSoundEnabled ? (
                                <Volume2Icon className="size-5" />
                            ) : (
                                <VolumeOffIcon className="size-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileHeader