"use client";

import Head from "next/head";
import React, { useEffect, useState, useRef } from "react";
import { BackArrow, RightArrowIcon } from "../../../../public/svg-icons/icons";
import SwitchComponent from "@/components/SwitchComponent/SwitchComponent";
import { sound_Notifications } from "@/routes/profile";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import CustomToggle from "@/components/TogglrButtonComponent/TogglrButton";

const Notification = () => {
  // State to manage sound and email notifications
  const [soundNotifications, setSoundNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);

  //   loading state
  const [loading, setLoading] = useState(false);

  /*----------i HAVE REMOVED THIS STATE AND FUNCTION TO ADD SOUNDS FILE-------*/
  /*
   const [isToggled, setIsToggled] = useState(false);
   const handleToggle = () => {
     setIsToggled(!isToggled);
   };*/

  /*----------ENABLE SOUND NOTIFICATION WHEN TOGGLE ON AND OFF-------*/
  /*----------UNCOMMENT THESE FUNCTION-------*/
  /*
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const el = new Audio("/sounds/notification_sound.wav");
    el.preload = "auto";
    el.volume = 0.9;
    audioRef.current = el;
    return () => {
      el.pause();

      el.src = "";
    };
  }, []);  */

  /*
  const playToggleSound = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      el.currentTime = 0;
      await el.play();
    } catch (e) {
      console.warn("Audio play failed", e);
    }
  };*/

  const playEnableSound = () => {
    const audio = new Audio("/sounds/notification_sound.wav");
    audio.volume = 0.9;
    void audio.play();
  };
  useEffect(() => {
    const sound = new URLSearchParams(window.location.search).get(
      "sound_notifications"
    );
    const email = new URLSearchParams(window.location.search).get(
      "email_notifications"
    );
    setSoundNotifications(sound === "true");
    setEmailNotifications(email === "true");
  }, []);

  // Function to handle sound notification toggle
  const handleSoundNotificationChange = async (value: boolean) => {
    setSoundNotifications(value);
    //play sound when notification sound enabling;
    if (value) {
      playEnableSound();
    }
    setLoading(true); // Set loading state to true while processing
    try {
      // const dataObj = { enabled: value };
      // const data = await sound_Notifications(dataObj);
      // console.log("Sound notifications data:", data);
      // if (data.success) {
      //   console.log("Sound notifications updated successfully");
      // } else {
      //   console.error("Failed to update sound notifications:", data.message);
      // }
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
      // const dataObj = { enabled: value };
      // const data = await sound_Notifications(dataObj);
      // console.log("Email notifications data:", data);
      // if (data.success) {
      //   console.log("Email notifications updated successfully");
      // } else {
      //   console.error("Failed to update email notifications:", data.message);
      // }
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
      <div className="min-h-screen bg-app-background-primary flex flex-col items-center pt-6 font-sans">
        <div className="w-full max-w-md px-4 mt-[64px]">
          {/* Header */}
          <header className="flex items-center">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()} // Simple back navigation
              className="p-2 -ml-2 mr-4" // Added padding for easier click and negative margin to align
            >
              <BackArrow className="text-app-icon" width={24} height={24} />
            </button>
            <h1 className="text-[23px] font-semibold text-app-text-primary font-plusJakartaSans-700">
              Notifications
            </h1>
          </header>
          {/* Notification Settings List */}
          <div className="mt-[32px]">
            <div className="flex justify-between items-center">
              <span
                id="email-notifications-label"
                className="text-[16px] text-app-text-primary font-plusJakartaSans-400"
              >
                Turn on Sound notifications
              </span>

              <CustomToggle
                // checked={isToggled}
                // onCheckedChange={handleToggle}
                checked={soundNotifications}
                onCheckedChange={handleSoundNotificationChange}
                aria-label="Enable or disable notifications"
                singleChecked={false}
              />
            </div>

            <div className="flex justify-between items-center mt-[21px]">
              <span
                id="email-notifications-label"
                className="text-[16px] text-app-text-primary font-plusJakartaSans-400"
              >
                E-Mail notifications
              </span>

              <CustomToggle
                checked={emailNotifications}
                onCheckedChange={handleEmailNotificationChange}
                aria-label="Enable or disable email notifications"
                singleChecked={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
