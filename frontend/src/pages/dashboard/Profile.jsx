import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Edit2,
  LogOut,
  FolderPen,
  FileText,
  Calendar,
  User,
} from "lucide-react";
import { useUser } from "../../utils/UserProvider";
import Loading from "../../components/Loading";
import toast from "react-hot-toast";
import { supabase } from "@/supabaseClient";

export default function UserProfile() {
  const { loggedUser, userProfile, isLoading } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editData, setEditData] = useState({
    full_name: "",
    bio: "",
  });

  useEffect(() => {
    if (userProfile) {
      setEditData({
        full_name: loggedUser?.user_metadata.display_name || "",
        bio: userProfile?.bio || "",
      });
    }
  }, [userProfile]);

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      // TODO: Add your update logic here using Supabase
      setIsUpdating(true);
      const { error } = await supabase
        .from("profile")
        .update({
          bio: editData.bio,
        })
        .eq("user_id", loggedUser.id);

      if (error) {
        setIsUpdating(false);
        return toast.error("Couldn't update profile");
      } else toast.success("Profile updated successfully!");
      setIsEditing(false);
      setIsUpdating(false);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Successfully Logged Out");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out");
    }
  };

  if (isLoading || isUpdating) {
    return <Loading />;
  }

  return (
    <div className="mb-5 mt-12 px-4 md:px-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className=""
      >
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account information
        </p>
      </motion.div>

      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className=""
        >
          {/* Profile Header */}
          <div className="flex items-center justify-between w-full bg-sidebar px-10 py-12 mt-4 rounded-xl">
            <div className="flex gap-4 items-center">
              <div className="p-5 aspect-square rounded-full bg-primary/20 text-primary">
                <User size={30} />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-foreground">
                  {loggedUser?.user_metadata.display_name || "User"}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {userProfile?.role || "Student"}
                </p>
              </div>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Fields */}
          <div className="space-y-6 mt-8 mx-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email
              </label>
              <p className="text-sm text-muted-foreground">
                {loggedUser?.email || "Not provided"}
              </p>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <FolderPen className="w-4 h-4 text-muted-foreground" />
                Full Name
              </label>

              <p className="text-sm text-muted-foreground pl-0">
                {loggedUser?.user_metadata.display_name || "Not provided"}
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={editData.bio}
                  onChange={(e) => handleEditChange("bio", e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  rows="4"
                  placeholder="Tell us about yourself"
                />
              ) : (
                <p className="text-sm text-foreground pl-0">
                  {userProfile?.bio || "Not provided"}
                </p>
              )}
            </div>

            {/* Member Since */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                Member Since
              </label>
              <p className="text-sm text-muted-foreground pl-0">
                {userProfile?.created_at
                  ? new Date(userProfile.created_at).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "Unknown"}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-12 flex w-full justify-center">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-12 py-4 bg-red-500 text-white rounded-md hover:bg-red-500/90 cursor-pointer duration-300 font-medium text-sm"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
