// import React, { useEffect } from "react";
// import { useChatStore } from "../store/useChatStore";
// import SidebarSkeleton from "./skeletons/SidebarSkeleton";
// import { Users } from "lucide-react";

// const Sidebar = () => {
//   const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
//     useChatStore();

//   const onlineUsers = [];

//   useEffect(() => {
//     getUsers();
//   }, [getUsers]);

//   if (isUsersLoading) return <SidebarSkeleton />;
//   return (
//     <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
//       <div className="border-b border-base-300 w-full p-5">
//         <div className="flex items-center gap-2">
//           <Users className="size-6" />
//           <span className="font-medium hidden lg:block">Contacts</span>
//         </div>
//         {/* TODO: Online filter togle */}
//       </div>

//       <div className="overflow-y-auto w-full py-3">
//         {users.map((user) => (
//           <button
//             key={user._id}
//             onClick={() => setSelectedUser(user)}
//             className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
//           >
//             <div className="relative mx-auto lg:mx-0">
//               <img
//                 src={user.profilePic || "/avatar.svg"}
//                 alt={user.name}
//                 className="size-12 object-cover rounded-full"
//               />
//               {onlineUsers.includes(user._id) && (
//                 <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
//               )}
//             </div>

//             <div className="hidden lg:block text-left min-w-0">
//               <div className="font-medium truncate">{user.fullName}</div>
//               <div className="text-sm text-zinc-400">
//                 {onlineUsers.includes(user._id) ? "online" : "Offline"}
//               </div>
//             </div>
//           </button>
//         ))}
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = ({ onSelect }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-full bg-base-100 border-r border-base-300 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-base-300">
        <Users className="size-5 text-primary" />
        <h2 className="font-semibold">Chats</h2>
        <span className="ml-auto text-xs opacity-60">{users.length}</span>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {users.length === 0 ? (
          <div className="text-center text-sm text-base-content/60 mt-6">
            No users found
          </div>
        ) : (
          users.map((user) => {
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
      </div>
    </aside>
  );
};

export default Sidebar;
