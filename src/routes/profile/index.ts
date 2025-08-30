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

export async function getAllUserData() {
  try {
    const res = await fetch(`${commonUrl}/users/user-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`, // Uncomment if you need to send a token
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// update profile picture
export async function updateProfilePicture(formData: any) {
  try {
    const res = await fetch(`${commonUrl}/users/profile-picture`, {
      method: "PUT",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `${getToken()}`,
      },
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

type aboutData = {
  about: string;
};

// create or update about
export async function createOrUpdateAbout(dataObj: aboutData) {
  try {
    const res = await fetch(`${commonUrl}/users/profile-about`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`,
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

type twoFac = {
  isEnabled: boolean;
};

// set two factor authentication
export async function setTwoFac(dataObj: twoFac) {
  try {
    const res = await fetch(
      `${commonUrl}/users/set-two-factor-authentication`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
        },
        body: JSON.stringify(dataObj),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

type verifyOtp = {
  otp: string;
};

// verify otp
export async function verifyOtp(dataObj: verifyOtp) {
  try {
    const res = await fetch(
      `${commonUrl}/users/verify-two-factor-authentication`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
        },
        body: JSON.stringify(dataObj),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

type customerSupport = {
  supportType: string;
  supportMessage: string;
};
// customer support
export async function customerSupport(dataObj: customerSupport) {
  try {
    const res = await fetch(
      `${commonUrl}/customer-support/send-support-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
        },
        body: JSON.stringify(dataObj),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
