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
import { BackArrow } from "../../../../public/svg-icons/icons";
import InterestCard from "@/components/InterestCard/InterestCard";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import Notifications from "@/components/Models/PermissionModels/Notifications";
import Photos from "@/components/Models/PermissionModels/Photos";
import Location from "@/components/Models/PermissionModels/Location";
import ChooseUserNameModel from "@/components/Models/ChooseUserNameModel/ChooseUserNameModel";
import InlineSvg from "@/components/InlineSVG/InlineSVG";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";

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
  //   loading state
  const [loading, setLoading] = useState(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  // This effect runs once when the component mounts to set notification permission
  // You can replace this with actual permission request logic if needed
  useEffect(() => {
    fetchInterests();
    setNotificationPermission(true);
  }, []);

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
        setError("Failed to update permissions: " + response.message);
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
        return;
      }
      setLocationPermission(false);
      setUserNamePermission(true);
    } catch (error) {
      console.error("Update permissions failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitSelectInterests = async () => {
    if (selectedInterestsIds.length < 3) {
      setError("Please select at least three interests.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
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
        setError("Failed to submit interests: " + data.message);
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
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
              className="w-[35px] h-[35px]"
              title={item.name}
            />
          ),
        })
      );
      setInterests(mapped);
    } catch (error) {
      setError("Failed to fetch interests. Please try again.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
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
        {/* Loading spinner */}
        {loading && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <LoadingComponent />
          </div>
        )}
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
      <SuccessModel
        isOpen={showSuccessModel}
        onClose={() => {
          setShowSuccessModel(false);
          setSuccess("");
        }}
        successMessage={success || ""}
      />
      <ErrorModel
        isOpen={showErrorModel}
        onClose={() => {
          setShowErrorModel(false);
          setError("");
        }}
        errorMessage={error || ""}
      />
    </div>
  );
};

export default ChooseInterests;
