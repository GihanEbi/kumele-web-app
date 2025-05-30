import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

// ---------- types --------------
type updatePermissionsForm = {
  allow_notifications: boolean;
  allow_photos: string; // "none" or "None", "selected" or "Selected Photos", "all" or "All Photos"
  allow_location: string; //"none" or "None", "while_using" or "While Using App", "once" or "Once"
};

type setUserNamesForm = {
  action: string; // other option is "skip" if skip request is performed do not keep username field at all
  username?: string;
};

type selectHobbiesForUsers = {
  hobbies: Number[];
};

const commonUrl = `${config.baseUrl}/auth`;
// should have to get the token and set it on the request

export async function user_permissions(dataObj: updatePermissionsForm) {
  try {
    const res = await fetch(`${commonUrl}/update-permissions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function set_user_name(dataObj: setUserNamesForm) {
  try {
    const res = await fetch(`${commonUrl}/set-username/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function select_hobbies_for_users(dataObj: selectHobbiesForUsers) {
  try {
    const res = await fetch(`${config.baseUrl}/api/select-hobbies/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function get_hobbies_list() {
  try {
    const res = await fetch(`${config.baseUrl}/api/hobbies/`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
