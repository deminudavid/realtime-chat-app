import React, { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Loader2 } from "lucide-react";

const ProfilePage = () => {
  const { updateProfile, isUpdatingProfile, authUser } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
    console.log("Selected file:", file);
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="card bg-base-100 shadow-lg p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="avatar">
                <div className="w-32 rounded-full">
                  <img
                    src={selectedImage || authUser?.profilePic || "/avatar.svg"}
                    alt="profile"
                  />
                </div>
              </div>

              {/* Edit Icon */}
              <button
                onClick={handleImageClick}
                className={`btn btn-primary btn-sm btn-circle absolute bottom-2 right-2 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
                title="Update profile picture"
              >
                {isUpdatingProfile ? (
                  <Loader2 className="size-10 animate-spin" />
                ) : (
                  <Camera className="size-4" />
                )}
              </button>

              <input
                type="file"
                id="avatar-upload"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </div>

            {/* Basic Info */}
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold">
                {authUser?.fullName || "Your Name"}
              </h2>
              <p className="text-base-content/70">
                {authUser?.email || "you@example.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                defaultValue={authUser?.fullName}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email Address</span>
              </label>
              <input
                type="email"
                defaultValue={authUser?.email}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>

        {/* Account Information */}
        <div className="card bg-base-100 shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Account Information</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-sm text-base-content/60">Member Since</span>
              <span className="font-medium">
                {authUser?.createdAt
                  ? new Date(authUser.createdAt).toLocaleDateString()
                  : "—"}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-base-content/60">
                Account Status
              </span>
              <span className="badge badge-success w-fit mt-1">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
