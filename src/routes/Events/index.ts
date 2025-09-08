import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

type EventCreationPayload = {
  user_id: string;
  category_id: string;
  destination: string;
  event_image: File | null;
  event_name: string;
  subtitle: string;
  description: string;
  event_start_in: string;
  event_date: string;
  event_start_time: string;
  event_end_time: string;
  street_address: string;
  home_number: string;
  district: string;
  postal_zip_code: string;
  state: string;
  age_range_min: number;
  age_range_max: number;
  max_guests: number;
  payment_type: string;
  price: number;
};

const commonUrl = `${config.baseUrl}`;

//---------create event------------------
/*
export async function createEvent(payload: EventCreationPayload) {
  try {
    const formData = new FormData();
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        const value = payload[key as keyof EventCreationPayload];
        formData.append(key, value as any);
      }
      const res = await fetch(`${commonUrl}/events/create-event`, {
        method: "POST",
        headers: {
          Authorization: `${getToken()}`,
        },
        body: formData,
      });
      const data = await res.json();
      return data;
    }
  } catch (error) {
    console.error("Failed to create event:", error);
    return error;
  }
}*/

//---------get all events----------------
export async function get_all_event_list() {
  try {
    const res = await fetch(`${config.baseUrl}/events/get-all-events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`,
      },
    });
    const data = await res.json();
    return data
  } catch (error) {
    return error;
  }
}

//---------get all events by event id------------------
export async function get_all_events_by_user_id(user_id: string) {
  try {
    const res = await fetch(
      `${config.baseUrl}/events/get-event-by-user-id/${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching events by user ID:", error);
    return error;
  }
}

//---------get all events by category id------------------
export async function get_all_events_by_category_id(category_id: string) {
  try {
    const res = await fetch(
      `${config.baseUrl}/events/get-event-by-category-id/${category_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching events by user ID:", error);
    return error;
  }
}

//---------get event by event id------------------
export async function get_event_by_event_id(event_id: string) {
  try {
    const res = await fetch(
      `${config.baseUrl}/events/get-event-by-id/${event_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching events by user ID:", error);
    return error;
  }
}

//----------update a event----------------------
export async function update_event(
  event_id: string,
  updatedData: EventCreationPayload
) {
  try {
    const res = await fetch(
      `${config.baseUrl}/events/update-event/${event_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${getToken()}`,
          
        },
        body: JSON.stringify(updatedData),
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating event:", error);
    return error;
  }
}


export async function createEvent(data: {
  [k: string]: any;
  event_image?: File | null;
}) {
  const form = new FormData();

 
  if (data.event_image instanceof File) {
    form.append("event_image", data.event_image, data.event_image.name);
  }

 
  Object.entries(data).forEach(([key, value]) => {
    if (key === "event_image") return;
    if (value === undefined || value === null) return;

   
    if (typeof value === "object" && !(value instanceof File)) {
      form.append(key, JSON.stringify(value));
    } else {
      form.append(key, String(value));
    }
  });

   const res = await fetch(`${commonUrl}/events/create-event`, {
    method: "POST",
    body: form, 
    headers: {
      Authorization: `${getToken()}`,
    },
    //credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json();
}

