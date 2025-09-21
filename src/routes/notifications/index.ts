import { config } from "@/config";
import { getToken } from "@/utils/authUtils";
const commonUrl = `${config.baseUrl}/notifications`;

// get unread notification count
export async function getUnreadNotificationCount() {
  try {
    const res = await fetch(`${commonUrl}/get-unread-notifications-count`, {
      method: "GET",
      headers: {
        authorization: `${getToken()}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching unread notification count:", error);
    throw error;
  }
}

// get all created hobbies notifications
export async function getAllCreateHobbiesNotifications() {
  try {
    const res = await fetch(`${commonUrl}/get-created-hobbies-notifications`, {
      method: "GET",
      headers: {
        authorization: `${getToken()}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching all created hobbies notifications:", error);
    throw error;
  }
}
