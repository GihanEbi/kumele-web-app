import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

const commonUrl = `${config.baseUrl}`;

// ---------- types ----------
type fetch_profile = {
  display_name: string;
  bio: string;
  picture_url: string;
  qr_code_url: string;
  followers_count: number;
  following_count: number;
  gold_status: number;
  sound_notifications: boolean;
  email_notifications: boolean;
  theme_mode: string; // "light" or "dark"
};

type sound_notifications = {
  enabled: boolean;
};

export async function fetch_profile() {
  try {
    const res = await fetch(`${commonUrl}/api/user-profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`, // Uncomment if you need to send a token
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function sound_Notifications(dataObj: sound_notifications) {
  try {
    const res = await fetch(`${commonUrl}/api/toggle-sound-notifications/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function email_Notifications(dataObj: sound_notifications) {
  try {
    const res = await fetch(`${commonUrl}/api/toggle-email-notifications/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
