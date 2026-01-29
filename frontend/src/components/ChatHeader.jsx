import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { ArrowLeft, CircleX, Target, X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);
  const initials = selectedUser.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-base-300 bg-base-100">
      {/* Avatar */}
      <div className="relative">
        <div className="avatar">
          <div className="w-10 rounded-full">
            {selectedUser.profilePic ? (
              <img
                src={selectedUser.profilePic}
                alt={selectedUser.fullName}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary text-primary-content font-semibold">
                {initials}
              </div>
            )}
          </div>
        </div>

        {/* Online indicator */}
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-base-100 rounded-full" />
        )}
      </div>

      {/* User info */}
      <div className="flex-1 overflow-hidden">
        <p className="font-semibold truncate">{selectedUser.fullName}</p>
        <p className="text-xs text-base-content/60">
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-sm btn-circle"
        >
          {" "}
          <CircleX className="size-4" />
          {/* <X className="size-4" /> */}
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
