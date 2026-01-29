import React from "react";
import { X } from "lucide-react";
import Sidebar from "./Sidebar";

const ResponsiveSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block w-72 h-full">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-base-100 shadow-xl
            transform transition-transform duration-300 ease-out
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-base-300 safe-top">
            <h2 className="font-semibold text-lg">Chats</h2>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="h-[calc(100%-3.5rem)]">
            <Sidebar onSelect={onClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveSidebar;
