import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Bell, HelpCircle, Lock } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { name: "Profile", icon: <User size={16} /> },
    { name: "Notifications", icon: <Bell size={16} /> },
    { name: "Help & Support", icon: <HelpCircle size={16} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <form className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
            <div>
              <label className="text-sm text-foreground/60">Full Name</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full py-2 bg-accent rounded-md px-8"
                  placeholder="Enter your name"
                  disabled
                  value="John Doe"
                />
                <Lock
                  className="absolute top-2.5 left-2 text-foreground/50"
                  size={12}
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-foreground/60">Email</label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full py-2 bg-accent rounded-md px-8"
                  placeholder="Enter your email"
                  disabled
                  value="sample@gmail.com"
                />
                <Lock
                  className="absolute top-2.5 left-2 text-foreground/50"
                  size={12}
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-foreground/60">Bio</label>
              <textarea
                className="w-full p-2 bg-accent rounded-md"
                placeholder="Tell us about yourself..."
                rows="3"
              />
            </div>
            <div>
              <label className="text-sm text-foreground/60">
                Profile Picture
              </label>
              <input
                type="file"
                className="w-full text-sm bg-accent p-2 rounded-md"
              />
            </div>
            <Button variant="default">Save Changes</Button>
          </form>
        );

      case "Notifications":
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" defaultChecked />
                Email course reminders
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" defaultChecked />
                In-app notifications
              </label>
              <label className="flex items-center gap-3 text-sm">
                <input type="checkbox" />
                Marketing updates
              </label>
              <Button variant="default" className="mt-3">
                Save Preferences
              </Button>
            </div>
          </div>
        );

      case "Help & Support":
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Help & Support</h3>
            <p className="text-sm text-foreground/60 mb-3">
              Need assistance? Reach out to our support team or leave feedback.
            </p>
            <textarea
              className="w-full p-2 bg-accent rounded-md focus:outline-none"
              rows="4"
              placeholder="Describe your issue or suggestion..."
            />
            <Button variant="default" className="mt-3">
              Send Message
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl h-[90vh] mb-5 px-10">
      <h1 className="text-2xl font-bold mt-6 mb-5">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-border pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 pb-2 text-sm font-medium transition-colors ${
              activeTab === tab.name
                ? "text-primary border-b-2 border-primary"
                : "text-foreground/60 hover:text-primary"
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="overflow-y-auto">{renderContent()}</div>
    </div>
  );
}
