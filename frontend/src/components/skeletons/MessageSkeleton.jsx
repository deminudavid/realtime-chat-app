import React from "react";

const MessageSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Incoming message */}
      <div className="flex items-end gap-2">
        <div className="skeleton w-8 h-8 rounded-full shrink-0" />
        <div className="space-y-2">
          <div className="skeleton h-3 w-40 rounded-lg" />
          <div className="skeleton h-3 w-24 rounded-lg" />
        </div>
      </div>

      {/* Outgoing message */}
      <div className="flex items-end justify-end gap-2">
        <div className="space-y-2 text-right">
          <div className="skeleton h-3 w-32 rounded-lg ml-auto" />
          <div className="skeleton h-3 w-20 rounded-lg ml-auto" />
        </div>
        <div className="skeleton w-8 h-8 rounded-full shrink-0" />
      </div>

      {/* Incoming message */}
      <div className="flex items-end gap-2">
        <div className="skeleton w-8 h-8 rounded-full shrink-0" />
        <div className="skeleton h-3 w-48 rounded-lg" />
      </div>

      {/* Outgoing message */}
      <div className="flex items-end justify-end gap-2">
        <div className="skeleton h-3 w-28 rounded-lg ml-auto" />
        <div className="skeleton w-8 h-8 rounded-full shrink-0" />
      </div>
    </div>
  );
};

export default MessageSkeleton;
