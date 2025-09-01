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
import {
  BackArrow,
  DownArrow,
  EmoryIcon,
} from "../../../../public/svg-icons/icons";
import InterestCard from "@/components/InterestCard/InterestCard";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import Notifications from "@/components/Models/PermissionModels/Notifications";
import Photos from "@/components/Models/PermissionModels/Photos";
import Location from "@/components/Models/PermissionModels/Location";
import ChooseUserNameModel from "@/components/Models/ChooseUserNameModel/ChooseUserNameModel";
import {
  SvgIcon1,
  SvgIcon10,
  SvgIcon11,
  SvgIcon12,
  SvgIcon13,
  SvgIcon14,
  SvgIcon15,
  SvgIcon16,
  SvgIcon17,
  SvgIcon18,
  SvgIcon19,
  SvgIcon2,
  SvgIcon20,
  SvgIcon21,
  SvgIcon22,
  SvgIcon23,
  SvgIcon24,
  SvgIcon25,
  SvgIcon3,
  SvgIcon4,
  SvgIcon5,
  SvgIcon6,
  SvgIcon7,
  SvgIcon8,
  SvgIcon9,
} from "../../../../public/svg-icons/newInterestIcons";
import InlineSvg from "@/components/InlineSVG/InlineSVG";

// types
// type ChooseInterestsProps = {
//   id: number;
//   name: string;
//   icon: string;
// };

type ChooseInterestsProps = {
  id: string | number; 
  name: string;
  icon: React.ReactNode; 
};

type PhotosChoice = "non" | "selected" | "all";
type LocationChoice = "non" | "while_using" | "once";

type PermissionsForm = {
  allow_notifications: boolean;
  allow_photos: PhotosChoice;
  allow_location: LocationChoice;
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
    // fetchInterests();
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
  const [form, setForm] = useState<PermissionsForm>({
    allow_notifications: false,
    allow_photos: "non",
    allow_location: "non",
  });

  const [interests, setInterests] = useState<ChooseInterestsProps[]>([]);

  // ------- state to hold the selected interests ------
  const [selectedInterestsIds, setSelectedInterestsIds] = useState<any[]>([]);

  useEffect(() => {
    fetchInterests();
  }, []);

  // This effect runs once when the component mounts to set notification permission
  // You can replace this with actual permission request logic if needed
  useEffect(() => {
    setNotificationPermission(true);
  }, []);

  //   Function to fetch interests from the backend
  // const fetchInterests = async () => {
  //   setLoading(true); // Set loading state to true while fetching
  //   try {
  //     const data = await get_hobbies_list();
  //     // Assuming data is an array of interests
  //     setSelectedInterests(data.data);
  //   } catch (error) {
  //     console.error("Error fetching interests:", error);
  //   } finally {
  //     setLoading(false); // Reset loading state after fetching
  //   }
  // };

  // Function to submit the permissions form
  const handleSubmitPermission = async (locationVal: string) => {
    setLoading(true);
    setLocationPermission(false);
    setUserNamePermission(true); // Show username permission after location
    setLoading(false);
    // try {
    //   // Here you would typically send the form data to your backend
    //   console.log("Submitting form with data:", form);

    //   // Update the form with the location value
    //   let dataObj = {
    //     allow_notifications: form.allow_notifications,
    //     allow_photos: form.allow_photos,
    //     allow_location: locationVal, // Use the passed location value
    //   };

    //   const data = await user_permissions(dataObj);
    //   console.log("Form submission response:", data);

    //   if (data.success) {
    //     setLocationPermission(false);
    //     setUserNamePermission(true); // Show username permission after location
    //     setLoading(false); // Reset loading state after submission
    //   } else {
    //     console.error("Failed to submit form:", data);
    //     setLoading(false); // Reset loading state on failure
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    //   setLoading(false);
    // } finally {
    //   // Reset permissions states after submission
    //   setNotificationPermission(false);
    //   setPhotosPermission(false);
    //   setLocationPermission(false);
    //   setLoading(false);
    // }
  };

  const submitPermissions = async () => {
    setLoading(true);
    const normalize = (v: string) => (v === "none" ? "non" : v);
    const payload = {
      allow_notifications: form.allow_notifications,
      allow_photos: normalize(form.allow_photos),
      allow_location: normalize(form.allow_location),
    };

    try {
      const response = await user_permissions(payload);
      if (!response.success) {
        const text = await response.text();
        throw new Error(text || `HTTP ${response.status}`);
      }
      setLocationPermission(false);
      setUserNamePermission(true);
    } catch (error) {
      console.error("Update permissions failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // function to submit the interests
  const handleSubmitInterests = async () => {
    setLoading(true);
    console.log(selectedInterestsIds);

    try {
      router.push("/authentication/earnMedals");
      // const data = await select_hobbies_for_users({
      //   hobbies: selectedInterestsIds,
      // });
      // if (data.success) {
      //   // redirect to earnMedals page
      //   router.push("/authentication/earnMedals");
      // } else {
      //   console.error("Failed to submit interests:", data);
      // }
    } catch (error) {
      console.error("Error submitting interests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSelectInterests = async () => {
    if (selectedInterestsIds.length === 0) {
      alert("Please select at least one interest.");
      return;
    }
    setLoading(true);
    const payload = {
      event_category_ids: selectedInterestsIds,
    };
    try {
      const data = await select_hobbies_for_users(payload);
      if (data.success) {
        // redirect to earnMedals page
        router.push("/authentication/earnMedals");
      } else {
        console.error("Failed to submit interests:", data);
      }
    } catch (error) {
      console.error("Error submitting interests:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const fetchInterests = async () => {
    setLoading(true);
    try {
      const res = await get_hobbies_list(); 
      const mapped: ChooseInterestsProps[] = (res?.data ?? []).map(
        (item: any) => ({
          id: item.id, 
          name: item.name, 
          icon: (
            <InlineSvg
              svg={item.svg_code} 
              //className="text-app-icon" 
              title={item.name}
            />
          ),
        })
      );
      setInterests(mapped);
    } catch (error) {
      console.error("Error fetching interests:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-y-auto max-h-screen no-scrollbar">
      <div
        className={`min-h-screen ${
          notificationPermission ||
          photosPermission ||
          locationPermission ||
          userNamePermission
            ? "bg-app-background-secondary"
            : "bg-app-background-primary"
        } flex flex-col items-center p-4 pt-6 sm:p-8`}
      >
        {/* Loading Spinner */}
        {loading && <LoadingComponent />}
        <div className="w-full max-w-md ">
          {/* Header */}
          <div
            className={`flex fixed top-0 left-0 right-0 pt-4 pl-2 pb-4 items-center w-full ${
              notificationPermission ||
              photosPermission ||
              locationPermission ||
              userNamePermission
                ? "bg-app-background-secondary"
                : "bg-app-background-primary"
            } pt-[64px]`}
          >
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className="rounded-full transition-colors"
            >
              <BackArrow className="text-app-icon" width={24} height={24} />
            </button>
            <h1 className="text-[23px] font-bold font-plusJakartaSans-700 text-app-text-primary ml-[24px]">
              Choose interests
            </h1>
          </div>
          <div className="mt-[90px]"></div>
          <p className="font-plusJakartaSans-400 text-app-text-primary text-[13px] mb-4 ml-5">
            Choose up to {MAX_SELECTIONS} interests:
          </p>

          {/* Interests Grid */}
          <div className="grid grid-cols-3 gap-[14px] px-3 ml-2">
            {interests.map((interest) => (
              <InterestCard
                key={interest.id}
                interest={interest}
                isSelected={selectedInterestsIds.includes(interest.id)}
                onToggle={(id) => {
                  console.log(selectedInterestsIds, " selected interests ids");
                  // Handle interest selection logic here
                  // push or remove interest from selectedInterestsIds
                  const interestId = id;
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
          <div className="space-y-3 mt-50 px-3 mb-10">
            <button
              onClick={() => {
                handleSubmitSelectInterests();
              }}
              className="w-full text-[16px] bg-app-button-primary text-app-text-tertiary font-plusJakartaSans-400 py-3 px-4 rounded-lg"
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
            setForm((prev) => ({ ...prev, allow_notifications: value }));
            setNotificationPermission(false);
            setPhotosPermission(true);
          }}
        />
      )}
      {photosPermission && !notificationPermission && (
        <Photos
          isOpen={photosPermission}
          onClose={(value: PhotosChoice) => {
            setForm((prev) => ({ ...prev, allow_photos: value }));
            setPhotosPermission(false);
            setLocationPermission(true);
          }}
        />
      )}
      {locationPermission && !photosPermission && (
        <Location
          isOpen={locationPermission}
          onClose={(value: LocationChoice) => {
            setForm((prev) => ({ ...prev, allow_location: value }));
            submitPermissions(); // <-- send all three values here
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
