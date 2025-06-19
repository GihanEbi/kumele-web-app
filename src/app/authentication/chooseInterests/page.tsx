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

// types
type ChooseInterestsProps = {
  id: number;
  name: string;
  icon: string;
};

// const mockInterestData = [
//   {
//     id: 1,
//     name: "Sports",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 2,
//     name: "Music",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 3,
//     name: "Travel",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 4,
//     name: "Cooking",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 5,
//     name: "Art",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 6,
//     name: "Travel",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 7,
//     name: "Sports",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 8,
//     name: "Music",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 9,
//     name: "Travel",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 10,
//     name: "Sports",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 11,
//     name: "Music",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 12,
//     name: "Travel",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 13,
//     name: "Sports",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 14,
//     name: "Music",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 15,
//     name: "Travel",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 16,
//     name: "Sports",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 17,
//     name: "Music",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 18,
//     name: "Travel",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 19,
//     name: "Sports",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 20,
//     name: "Music",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 21,
//     name: "Travel",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 22,
//     name: "Sports",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 23,
//     name: "Music",
//     icon: <EmoryIcon />,
//   },
//   {
//     id: 24,
//     name: "Travel",
//     icon: <EmoryIcon />,
//   },
// ];

const mockInterestData = [
  {
    id: 1,
    name: "Sports",
    icon: <SvgIcon1 />,
  },
  {
    id: 2,
    name: "Music",
    icon: <SvgIcon2 />,
  },
  {
    id: 3,
    name: "Travel",
    icon: <SvgIcon3 />,
  },
  {
    id: 4,
    name: "Cooking",
    icon: <SvgIcon4 />,
  },
  {
    id: 5,
    name: "Art",
    icon: <SvgIcon5 />,
  },
  {
    id: 6,
    name: "Travel",
    icon: <SvgIcon6 />,
  },
  {
    id: 7,
    name: "Sports",
    icon: <SvgIcon7 />,
  },
  {
    id: 8,
    name: "Music",
    icon: <SvgIcon8 />,
  },
  {
    id: 9,
    name: "Travel",
    icon: <SvgIcon9 />,
  },
  {
    id: 10,
    name: "Sports",
    icon: <SvgIcon10 />,
  },
  {
    id: 11,
    name: "Music",
    icon: <SvgIcon11 />,
  },
  {
    id: 12,
    name: "Travel",
    icon: <SvgIcon12 />,
  },
  {
    id: 13,
    name: "Sports",
    icon: <SvgIcon13 />,
  },
  {
    id: 14,
    name: "Music",
    icon: <SvgIcon14 />,
  },
  {
    id: 15,
    name: "Travel",
    icon: <SvgIcon15 />,
  },
  {
    id: 16,
    name: "Sports",
    icon: <SvgIcon16 />,
  },
  {
    id: 17,
    name: "Music",
    icon: <SvgIcon17 />,
  },
  {
    id: 18,
    name: "Travel",
    icon: <SvgIcon18 />,
  },
  {
    id: 19,
    name: "Sports",
    icon: <SvgIcon19 />,
  },
  {
    id: 20,
    name: "Music",
    icon: <SvgIcon20 />,
  },
  {
    id: 21,
    name: "Travel",
    icon: <SvgIcon21 />,
  },
  {
    id: 22,
    name: "Sports",
    icon: <SvgIcon22 />,
  },
  {
    id: 23,
    name: "Music",
    icon: <SvgIcon23 />,
  },
  {
    id: 24,
    name: "Travel",
    icon: <SvgIcon24 />,
  },
  {
    id: 25,
    name: "Travel",
    icon: <SvgIcon25 />,
  },
];

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

  return (
    <div>
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
        <div className="w-full max-w-md">
          {/* Header */}
          <div
            className={`flex fixed top-0 left-0 right-0 pt-4 pl-2 pb-4 items-center w-full ${
              notificationPermission ||
              photosPermission ||
              locationPermission ||
              userNamePermission
                ? "bg-app-background-secondary"
                : "bg-app-background-primary"
            }`}
          >
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className="rounded-full transition-colors"
            >
              <BackArrow className="text-app-icon" />
            </button>
            <h1 className="text-xl font-bold font-plusJakartaSans text-app-text-primary ml-4">
              Choose interests
            </h1>
          </div>
          <p className="font-plusJakartaSans text-app-text-primary text-xs mb-4 mt-10 ml-5">
            Choose up to {MAX_SELECTIONS} interests:
          </p>

          {/* Interests Grid */}
          <div className="grid grid-cols-3 gap-3 px-3">
            {mockInterestData.map((interest) => (
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
          <div className="space-y-3 mt-50 px-3">
            <button
              onClick={() => {
                handleSubmitInterests();
              }}
              className="w-full text-sm mt-5 bg-app-button-primary text-app-text-tertiary font-plusJakartaSans py-3 px-4 rounded-lg "
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
