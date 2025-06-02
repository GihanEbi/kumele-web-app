"use client";

import Head from "next/head";
import React, { useEffect, useState } from "react";
import {
  BackArrow,
  RightArrowIcon,
} from "../../../../../public/svg-icons/icons";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
import { sound_Notifications } from "@/routes/profile";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

const Notification = (
) => {
  // State to manage sound and email notifications
  const [soundNotifications, setSoundNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);

  //   loading state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const sound = new URLSearchParams(window.location.search).get("sound_notifications");
    const email = new URLSearchParams(window.location.search).get("email_notifications");
    setSoundNotifications(sound === "true");
    setEmailNotifications(email === "true");
  }, []);

  // Function to handle sound notification toggle
  const handleSoundNotificationChange = async (value: boolean) => {
    setSoundNotifications(value);
    setLoading(true); // Set loading state to true while processing
    try {
      const dataObj = { enabled: value };
      const data = await sound_Notifications(dataObj);
      console.log("Sound notifications data:", data);

      if (data.success) {
        console.log("Sound notifications updated successfully");
      } else {
        console.error("Failed to update sound notifications:", data.message);
      }
    } catch (error) {
      console.error("Error updating sound notifications:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Function to handle email notification toggle
  const handleEmailNotificationChange = async (value: boolean) => {
    setEmailNotifications(value);
    setLoading(true); // Set loading state to true while processing
    try {
      const dataObj = { enabled: value };
      const data = await sound_Notifications(dataObj);
      console.log("Email notifications data:", data);

      if (data.success) {
        console.log("Email notifications updated successfully");
      } else {
        console.error("Failed to update email notifications:", data.message);
      }
    } catch (error) {
      console.error("Error updating email notifications:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <Head>
        <title>Notifications Settings</title>
      </Head>
      <div className="min-h-screen bg-white flex flex-col items-center pt-6 font-sans">
        <div className="w-full max-w-md px-4">
          {/* Header */}
          <header className="flex items-center mb-10">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="p-2 -ml-2 mr-2" // Added padding for easier click and negative margin to align
            >
              <BackArrow />
            </button>
            <h1 className="text-3xl font-bold text-black">Notifications</h1>
          </header>
          {/* Notification Settings List */}
          <div className="space-y-1">
            <div className="flex justify-between items-center py-4">
              <span
                id="email-notifications-label"
                className="text-md text-gray-700"
              >
                Turn on Sound notifications
              </span>

              <SwitchComponent
                required
                disabled={false}
                value={soundNotifications}
                // onChange={handleSoundNotificationChange}
                onclick={handleSoundNotificationChange}
              />
            </div>

            <div className="flex justify-between items-center py-4">
              <span
                id="email-notifications-label"
                className="text-md text-gray-700"
              >
                E-Mail notifications
              </span>
              <SwitchComponent
                required
                disabled={false}
                value={emailNotifications}
                onChange={setEmailNotifications}
                onclick={handleSoundNotificationChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
