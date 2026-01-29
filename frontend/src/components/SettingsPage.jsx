import React from "react";
import { Check } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
// import { useAuthStore } from "../store/useAuthStore";
import { themes } from "../constants";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  // const { authUser } = useAuthStore();

  // const userInitial = authUser?.fullName?.charAt(0)?.toUpperCase() || "J";

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-base-content/60">
          Preview and customize your app theme
        </p>
      </div>

      <div className="">
        {/* Theme Selector */}
        <div className="">
          <div className="card bg-base-100 shadow-sm border border-base-300">
            <div className="card-body">
              <h2 className="card-title mb-4">Themes</h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-8 gap-3">
                {themes.map(({ name, label, icon: Icon }) => {
                  const isActive = theme === name;

                  return (
                    <button
                      key={Icon + name}
                      onClick={() => setTheme(name)}
                      className={`relative btn justify-start gap-2 ${
                        isActive ? "btn-primary" : "btn-outline"
                      }`}
                    >
                      {isActive && (
                        <Check className="absolute top-1.5 right-1.5 size-3" />
                      )}
                      <Icon className="size-4" />
                      <span className="text-sm">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="max-w-lg mx-auto m-2 lg:my-20">
          <h2 className="text-lg font-semibold mt-2 p-4">Theme Preview</h2>
          <div
            data-theme={theme}
            className="rounded-xl border border-base-300 bg-base-100 shadow-sm overflow-hidden"
          >
            {/* Mock App Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-base-300 bg-base-200">
              <div>
                <h3 className="font-semibold">ChatApp</h3>
                <p className="text-xs opacity-60">Theme: {theme}</p>
              </div>

              {/* User Avatar */}
              <div className="avatar placeholder">
                <div className="bg-primary font-medium flex items-center justify-center text-primary-content rounded-full w-9">
                  J
                </div>
              </div>
            </div>

            {/* Mock Chat */}
            <div className="p-4 space-y-3 bg-base-100">
              <div className="chat chat-start">
                <div className="chat-bubble">
                  Hey! This theme looks great 👋
                </div>
              </div>

              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-primary">
                  Yeah, the colors feel nice ✨
                </div>
              </div>

              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-secondary">
                  Perfect for long chats!
                </div>
              </div>

              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-primary">
                  Switching themes is instant 😄
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="px-4 py-3 border-t border-base-300 bg-base-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  disabled
                  placeholder="Type a message…"
                  className="input input-bordered w-full"
                />
                <button className="btn btn-primary btn-sm">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
