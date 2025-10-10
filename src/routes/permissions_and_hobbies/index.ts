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

type SelectedInterests = {
event_category_ids:string[]; // array of selected interest IDs as strings
  }

const commonUrl = `${config.baseUrl}/`;
// should have to get the token and set it on the request

export async function user_permissions(dataObj: updatePermissionsForm) {
 // const token = await getToken();
  console.log("token is ", getToken());
  try {
    const res = await fetch(`${commonUrl}users/update-permissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${getToken()}`, // Uncomment if you need to send a token
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
    const res = await fetch(`${commonUrl}users/set-username/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function select_hobbies_for_users(dataObj: SelectedInterests) {
  try {
    const res = await fetch(`${config.baseUrl}/users/set-user-event-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${getToken()}`, // Uncomment if you need to send a token
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
    const res = await fetch(`${config.baseUrl}/event-category/get-event-categories`, {
      method: "GET",
       headers: {
        "Content-Type": "application/json",
        // "Authorization": `${getToken()}`, // Uncomment if you need to send a token
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
