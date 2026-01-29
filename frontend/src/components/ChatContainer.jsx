import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const { messages, getMessages, selectedUser, isMessagesLoading } =
    useChatStore();
  const { authUser } = useAuthStore();

  const messagesEndRef = useRef(null);

  // Fetch messages when a user is selected
  useEffect(() => {
    if (!selectedUser) return;
    getMessages(selectedUser._id);
  }, [selectedUser, getMessages]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!selectedUser) return <NoChatSelected />;

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col h-full overflow-hidden relative">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col h-full relative">
      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 mb-[80px]">
        {/* Add bottom margin so messages don't hide behind input */}
        {messages.map((message) => {
          const isMe = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              {/* Avatar */}
              {!isMe && (
                <div className="flex-shrink-0 mr-2 sm:mr-3">
                  <img
                    src={selectedUser.profilePic || "/avatar.jpg"}
                    alt={selectedUser.fullName}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border"
                  />
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`max-w-[75%] sm:max-w-[60%] p-2 sm:p-3 rounded-lg break-words flex flex-col ${
                  isMe
                    ? "bg-primary text-primary-content rounded-br-none"
                    : "bg-base-200 text-base-content rounded-bl-none"
                }`}
              >
                <div className="flex flex-col  mb-1">
                  <span className="text-sm">{message.text}</span>
                  <time className="text-xs opacity-50 ml-2">
                    {formatMessageTime(message.createdAt)}
                  </time>
                </div>

                {message.image && (
                  <img
                    src={message.image}
                    alt="attachment"
                    className="max-w-full rounded-md mt-1"
                  />
                )}
              </div>

              {/* Avatar for self */}
              {isMe && (
                <div className="flex-shrink-0 ml-2 sm:ml-3">
                  <img
                    src={authUser.profilePic || "/avatar.jpg"}
                    alt={authUser.fullName}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border"
                  />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input */}
      <div className="absolute bottom-0 left-0 w-full">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
