import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const Sidebar = ({ onSelect }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full bg-base-100 border-r border-base-300 flex flex-col">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2 px-4 py-3">
          <Users className="size-5 text-primary" />
          <h2 className="font-semibold">Chats</h2>
          <span className="ml-auto text-xs opacity-60">{users.length}</span>
        </div>

        <div className=" mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {users.length === 0 ? (
          <div className="text-center text-sm text-base-content/60 mt-6">
            No users found
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isActive = selectedUser?._id === user._id;
            const isOnline = onlineUsers.includes(user._id);

            return (
              <button
                key={user._id}
                onClick={() => {
                  setSelectedUser(user);
                  onSelect?.(); // auto-close mobile drawer
                }}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition cursor-pointer
                  ${isActive ? "bg-primary/10" : "hover:bg-base-200"}`}
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={user.profilePic || "/avatar.svg"}
                        alt={user.fullName}
                      />
                    </div>
                  </div>

                  {/* Online Indicator */}
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-base-100 rounded-full" />
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 text-left overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium truncate">{user.fullName}</p>
                      <p className="text-xs text-base-content/60 truncate">
                        Click to chat
                      </p>
                    </div>

                    <div className=" hidden lg:block text-xs text-zinc-400">
                      {onlineUsers.includes(user._id) ? "online" : "Offline"}
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
