import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

const commonUrl = `${config.baseUrl}/users`;

type profileNotificationStatus = {
  soundNotifications: boolean;
  emailNotifications: boolean;
};

export async function getProfileNotificationStatus() {
  try {
    const res = await fetch(`${commonUrl}/user-notification-status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function createOrUpdateProfileNotificationStatus(
  dataObj: profileNotificationStatus
) {
  try {
    const res = await fetch(`${commonUrl}/update-notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
