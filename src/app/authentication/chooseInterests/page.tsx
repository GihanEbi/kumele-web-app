"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  get_hobbies_list,
  select_hobbies_for_users,
  set_user_name,
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

  // ------- state to hold the selected interests ------
  const [selectedInterestsIds, setSelectedInterestsIds] = useState<number[]>(
    []
  );

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
  const handleSubmitPermission = async (locationVal: string) => {
    setLoading(true);
    try {
      // Here you would typically send the form data to your backend
      console.log("Submitting form with data:", form);

      // Update the form with the location value
      let dataObj = {
        allow_notifications: form.allow_notifications,
        allow_photos: form.allow_photos,
        allow_location: locationVal, // Use the passed location value
      };

      const data = await user_permissions(dataObj);
      console.log("Form submission response:", data);

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
    } finally {
      // Reset permissions states after submission
      setNotificationPermission(false);
      setPhotosPermission(false);
      setLocationPermission(false);
      setLoading(false);
    }
  };

  // function to submit the interests
  const handleSubmitInterests = async () => {
    setLoading(true);
    console.log(selectedInterestsIds);

    try {
      const data = await select_hobbies_for_users({
        hobbies: selectedInterestsIds,
      });
      if (data.success) {
        // redirect to earnMedals page
        router.push("/authentication/earnMedals");
      } else {
        console.error("Failed to submit interests:", data);
      }
    } catch (error) {
      console.error("Error submitting interests:", error);
    } finally {
      setLoading(false);
    }
  };

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
                isSelected={selectedInterestsIds.includes(interest.id)}
                onToggle={(id) => {
                  // Handle interest selection logic here
                  console.log("Toggled interest:", id);
                  // push or remove interest from selectedInterestsIds
                  const interestId = parseInt(id, 10);
                  if (selectedInterestsIds.includes(interestId)) {
                    setSelectedInterestsIds((prev) =>
                      prev.filter((i) => i !== interestId)
                    );
                  } else if (selectedInterestsIds.length < MAX_SELECTIONS) {
                    setSelectedInterestsIds((prev) => [...prev, interestId]);
                  } else {
                    alert(
                      `You can only select up to ${MAX_SELECTIONS} interests.`
                    );
                  }
                }}
              />
            ))}
          </div>
          <div className="space-y-3">
            <button
              onClick={() => {
                handleSubmitInterests();
              }}
              className="w-full mt-5 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Continue
            </button>
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
            handleSubmitPermission(value);
          }}
        />
      )}
      {userNamePermission && !locationPermission && (
        <ChooseUserNameModel
          isOpen={userNamePermission}
          onClose={() => {
            setUserNamePermission(false);
          }}
        />
      )}
    </div>
  );
};

export default ChooseInterests;
