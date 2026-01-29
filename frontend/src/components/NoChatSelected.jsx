import React from "react";
import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-base-100 p-4">
      <div className="flex flex-col items-center text-center max-w-xs sm:max-w-sm md:max-w-md px-4 sm:px-6">
        {/* Icon */}
        <div className="mb-4 rounded-full bg-base-200 p-4 sm:p-6 animate-bounce">
          <MessageSquare className="size-8 sm:size-10 text-primary" />
        </div>

        {/* Text */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
          No conversation selected
        </h2>
        <p className="mt-2 text-sm sm:text-base text-base-content/60">
          Select a chat from the sidebar to start messaging, or begin a new
          conversation.
        </p>

        {/* Hint / CTA */}
        <div className="mt-6">
          <span className="badge badge-outline text-sm sm:text-base">
            👈 Choose a chat to get started
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
