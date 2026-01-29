import React from "react";

const SidebarSkeleton = () => {
  return (
    <div className="h-full w-full p-4 space-y-4 bg-base-100">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="skeleton h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-1/2" />
          <div className="skeleton h-3 w-1/3" />
        </div>
      </div>

      {/* Search */}
      <div className="skeleton h-10 w-full rounded-lg" />

      {/* Chat list */}
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-2 rounded-lg"
          >
            <div className="skeleton h-12 w-12 rounded-full" />

            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarSkeleton;
