import { useRef, useState } from "react";
import useKeySound from "../hooks/useKeySound.js";
import { useChatStore } from "../store/useChatStore.js";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

const MessageInput = () => {

  const { playRandomSound } = useKeySound();
  const [Text, setText] = useState("");
  const [ImgPreview, setImgPreview] = useState(null);

  const fileInputRef = useRef(null);

  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!Text && !ImgPreview) {
      return;
    }
    if (isSoundEnabled) {
      playRandomSound()
    }

    sendMessage({
      text: Text.trim(),
      image: ImgPreview
    })

    setText("");
    setImgPreview(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImgPreview(reader.result);
    reader.readAsDataURL(file)
  }

  const removeImg = () => {
    setImgPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

  }

  return (
    <>
      <div className="p-4 border-t border-slate-700/50">
      {ImgPreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={ImgPreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <button
              onClick={removeImg}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex space-x-4">
        <input
          type="text"
          value={Text}
          onChange={(e) => {
            setText(e.target.value);
            isSoundEnabled && playRandomSound();
          }}
          className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4"
          placeholder="Type your message..."
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImgChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${
            ImgPreview ? "text-cyan-500" : ""
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!Text.trim() && !ImgPreview}
          className="bg-linear-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
    </>
  )
}

export default MessageInput