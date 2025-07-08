"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Notifications from "@/components/Models/PermissionModels/Notifications";
import Photos from "@/components/Models/PermissionModels/Photos";
import Location from "@/components/Models/PermissionModels/Location";
import ChooseUserNameModel from "@/components/Models/ChooseUserNameModel/ChooseUserNameModel";
import {
  getNewPartnershipUser,
  getPartnershipToken,
  removeNewPartnershipUser,
} from "@/utils/partnershipUtils";

const page = () => {
  // use the appContext to get the more option state
  const isNewPartnershipUser = getNewPartnershipUser();
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
  // use the appContext to get the more option state
  const { setIsBottomNavBarFixed } = useAppContext();

  useEffect(() => {
    setIsBottomNavBarFixed(false);
  }, []);

  // This effect runs once when the component mounts to set notification permission
  // You can replace this with actual permission request logic if needed
  useEffect(() => {
    setNotificationPermission(true);
  }, []);

  return (
    <div>
      <div>Partner ship home</div>
      {notificationPermission && isNewPartnershipUser === "yes" && (
        <Notifications
          isOpen={notificationPermission}
          onClose={(value: boolean) => {
            setNotificationPermission(false);
            setPhotosPermission(true);
          }}
        />
      )}
      {photosPermission &&
        !notificationPermission &&
        isNewPartnershipUser === "yes" && (
          <Photos
            isOpen={photosPermission}
            onClose={(value: string) => {
              setPhotosPermission(false);
              setLocationPermission(true);
            }}
          />
        )}
      {locationPermission &&
        !photosPermission &&
        isNewPartnershipUser === "yes" && (
          <Location
            isOpen={locationPermission}
            onClose={(value: string) => {
              setLocationPermission(false);
              setUserNamePermission(true);
            }}
          />
        )}
      {userNamePermission &&
        !locationPermission &&
        isNewPartnershipUser === "yes" && (
          <ChooseUserNameModel
            isOpen={userNamePermission}
            onClose={() => {
              removeNewPartnershipUser();
              setUserNamePermission(false);
            }}
          />
        )}
    </div>
  );
};

export default page;
