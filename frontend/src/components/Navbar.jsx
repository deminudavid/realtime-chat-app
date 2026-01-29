import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Bell, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [lightTheme, setLightTheme] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      lightTheme ? "light" : "dark",
    );
  }, [lightTheme]);

  const navLinkClass = ({ isActive }) =>
    isActive ? "font-semibold text-primary" : "text-base-content/70";

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-lg border-b border-base-300 sticky top-0 z-50 px-4">
      {/* Left */}
      <div className="navbar-start gap-2">
        {/* Mobile Menu */}
        <div className="dropdown md:hidden">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle"
          >
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink
                to="/"
                className={navLinkClass}
              >
                Home
              </NavLink>
            </li>
            {authUser && (
              <>
                <li>
                  <NavLink
                    to="/chat"
                    className={navLinkClass}
                  >
                    Chat
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    className={navLinkClass}
                  >
                    Profile
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/settings"
                className={navLinkClass}
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold"
        >
          Chat<span className="text-primary">App</span>
        </Link>
      </div>

      {/* Center (Desktop Links) */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal gap-4">
          <li>
            <NavLink
              to="/"
              className={navLinkClass}
            >
              Home
            </NavLink>
          </li>
          {authUser && (
            <li>
              <NavLink
                to="/chat"
                className={navLinkClass}
              >
                Chat
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/settings"
              className={navLinkClass}
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end gap-3">
        {/* Theme Switch */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            className="theme-controller"
            checked={!lightTheme}
            onChange={() => setLightTheme((prev) => !prev)}
          />

          {lightTheme ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
        </label>

        {/* Notifications */}
        {authUser && (
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <Bell className="size-4" />
              <span className="badge badge-xs badge-primary indicator-item" />
            </div>
          </button>
        )}

        {/* Auth */}
        {!authUser ? (
          <>
            <Link
              to="/login"
              className="btn btn-ghost"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-primary"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="relative w-10 rounded-full">
                <img
                  src={authUser?.avatar || "https://i.pravatar.cc/150"}
                  alt="avatar"
                />
                {/* Online Indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-base-100 rounded-full" />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56"
            >
              <li className="px-2 py-1">
                <p className="font-semibold">{authUser?.fullName}</p>
                <span className="text-xs opacity-60 truncate">
                  {authUser?.email}
                </span>
              </li>
              <div className="divider my-1" />
              <li>
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="text-error"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
