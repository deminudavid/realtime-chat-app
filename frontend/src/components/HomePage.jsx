import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "./Sidebar";
import NoChatSelected from "./NoChatSelected";
import ChatContainer from "./ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-2 sm:px-4 h-full">
        <div className="bg-base-100 rounded-lg shadow w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full overflow-hidden rounded-lg">
            {/* Sidebar */}
            <div
              className={`${selectedUser ? "hidden" : "w-full"}  lg:w-72 border-r border-base-300`}
            >
              <Sidebar />
            </div>

            {/* Chat Area */}
            <div className="flex-1">
              {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
