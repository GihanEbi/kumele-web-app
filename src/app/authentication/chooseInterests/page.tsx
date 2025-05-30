"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  get_hobbies_list,
  user_permissions,
} from "@/routes/permissions_and_hobbies";
import { BackArrow, DownArrow } from "../../../../public/svg-icons/icons";
import InterestCard from "@/components/InterestCard/InterestCard";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import Notifications from "@/components/Models/PermissionModels/Notifications";
import Photos from "@/components/Models/PermissionModels/Photos";
import Location from "@/components/Models/PermissionModels/Location";
import ChooseUserNameModel from "@/components/Models/ChooseUserNameModel/ChooseUserNameModel";

// types
type ChooseInterestsProps = {
  id: number;
  name: string;
  icon: string;
};

// maximum number of selections allowed
const MAX_SELECTIONS = 5;

const ChooseInterests = () => {
  const router = useRouter();
  //   ------ state for interests selection ------
  const [selectedInterests, setSelectedInterests] = useState<
    ChooseInterestsProps[]
  >([]);
  //   ------ loading state for interests ------
  const [loading, setLoading] = useState<boolean>(false);

  //  ------ get interest data from backend ------
  // This effect runs once when the component mounts to fetch interests
  useEffect(() => {
    fetchInterests();
  }, []);
  //  ------ states for permissions ------
  // ------- state for notification permissions ------
  const [notificationPermission, setNotificationPermission] =
    useState<boolean>(false);
  // ------- state for location permissions ------
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  // ------- state for photos permissions ------
  const [photosPermission, setPhotosPermission] = useState<boolean>(false);
  // ------- state for user name permissions ------
  const [userNamePermission, setUserNamePermission] = useState<boolean>(false);

  // ------- form values for permissions ------
  const [form, setForm] = useState({
    allow_notifications: false,
    allow_photos: "",
    allow_location: "",
  });

  // This effect runs once when the component mounts to set notification permission
  // You can replace this with actual permission request logic if needed
  useEffect(() => {
    setNotificationPermission(true);
  }, []);

  //   Function to fetch interests from the backend
  const fetchInterests = async () => {
    setLoading(true); // Set loading state to true while fetching
    try {
      const data = await get_hobbies_list();
      // Assuming data is an array of interests
      setSelectedInterests(data.data);
    } catch (error) {
      console.error("Error fetching interests:", error);
    } finally {
      setLoading(false); // Reset loading state after fetching
    }
  };

  // Function to submit the permissions form
  const handleSubmitPermission = async () => {
    setLoading(true);
    try {
      // Here you would typically send the form data to your backend
      console.log("Submitting form with data:", form);
      
      const data = await user_permissions(form);

      if (data.success) {
        setLocationPermission(false);
        setUserNamePermission(true); // Show username permission after location
        setLoading(false); // Reset loading state after submission
        
      } else {
        console.error("Failed to submit form:", data);
        setLoading(false); // Reset loading state on failure
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }finally{
      // Reset permissions states after submission
      setNotificationPermission(false);
      setPhotosPermission(false);
      setLocationPermission(false);
      setUserNamePermission(false);
      setLoading(false);
    }
  };

  // Function to submit username

  return (
    <div>
      <div
        className={`min-h-screen ${
          notificationPermission ? "bg-gray-300" : "bg-white"
        } flex flex-col items-center p-4 pt-6 sm:p-8`}
      >
        {/* Loading Spinner */}
        {loading && <LoadingComponent />}
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center mb-3">
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className="text-gray-700 hover:text-black p-2 -ml-2 rounded-full transition-colors"
            >
              <BackArrow />
            </button>
            <h1 className="text-2xl font-bold text-gray-800 ml-2">
              Choose interests
            </h1>
          </div>
          <p className="text-gray-600 text-sm mb-6 ml-5">
            Choose up to {MAX_SELECTIONS} interests:
          </p>

          {/* Interests Grid */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {selectedInterests.map((interest) => (
              <InterestCard
                key={interest.id}
                interest={interest}
                isSelected={false} // Replace with actual selection logic
                onToggle={(id) => {
                  // Handle interest selection logic here
                  console.log("Toggled interest:", id);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {notificationPermission && (
        <Notifications
          isOpen={notificationPermission}
          onClose={(value: boolean) => {
            console.log("Notification permission:", value);

            setForm((prev) => ({ ...prev, allow_notifications: value }));
            setNotificationPermission(false);
            setPhotosPermission(true);
          }}
        />
      )}
      {photosPermission && !notificationPermission && (
        <Photos
          isOpen={photosPermission}
          onClose={(value: string) => {
            console.log("Photos permission:", value);
            setForm((prev) => ({ ...prev, allow_photos: value }));
            setPhotosPermission(false);
            setLocationPermission(true);
          }}
        />
      )}
      {locationPermission && !photosPermission && (
        <Location
          isOpen={locationPermission}
          onClose={(value: string) => {
            console.log("Location permission:", value);
            setForm((prev) => ({ ...prev, allow_location: value }));
            handleSubmitPermission()
          }}
        />
      )}
      {userNamePermission && !locationPermission && (
        <ChooseUserNameModel
          isOpen={userNamePermission}
          onClose={(value: string) => {
            console.log("Username permission:", value);
            setForm((prev) => ({ ...prev, allow_username: value }));
            handleSubmitPermission();
          }}
        />
      )}
    </div>
  );
};

export default ChooseInterests;
