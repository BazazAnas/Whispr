import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import NoChatContainer from './NoChatContainer';
import MessageInput from './MessageInput';
import MessageLoadingSkeleton from './MessageLoadingSkeleton';

const ChatContainer = () => {

  const { getMessagesByUserId, messages, selectedUser, isMessagesLoading, listenToMessages, noListenToMessages } = useChatStore()
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id)
    listenToMessages()

    return () => noListenToMessages()
  }, [selectedUser, getMessagesByUserId, listenToMessages, noListenToMessages])

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behaviour: "smooth" })
    }
  }, [messages])

  return (
    <>
      <ChatHeader />
      <div className='flex-1 px-6 overflow-y-auto py-8 '>
        {messages.length > 0 && !isMessagesLoading ? (
          <div className='max-w-3xl mx-auto space-y-6'>
            {messages.map((message) => (
              <div key={message._id}
                className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div className={`chat-bubble relative 
                    ${message.senderId === authUser._id
                    ? 'bg-cyan-700 text-white'
                    : 'bg-slate-700 text-slate-300'
                  }
                    `}>
                  {message.image && (
                    <img src={message.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                  )}
                  {message.text && <p className="mt-2">{message.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(message.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessageLoadingSkeleton />
        ) : (
          <NoChatContainer name={selectedUser.fullName.charAt(0).toUpperCase() + selectedUser.fullName.slice(1)} />
        )}
      </div>
      <MessageInput />
    </>
  )
}

export default ChatContainer