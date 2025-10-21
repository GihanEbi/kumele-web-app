import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

type EventCreationPayload = {
  category_id: string;
  destination: string;
  event_image: string;
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
  age_range_min: string;
  age_range_max: string;
  max_guests: string;
  payment_type: string;
  price: string;
};

const commonUrl = `${config.baseUrl}`;

export async function createEvent(data: EventCreationPayload) {
  const formData = new FormData();
  formData.append("category_id", data.category_id);
  formData.append("destination", data.destination);
  formData.append("event_image", data.event_image);
  formData.append("event_name", data.event_name);
  formData.append("subtitle", data.subtitle);
  formData.append("description", data.description);
  formData.append("event_start_in", data.event_start_in);
  formData.append("event_date", data.event_date);
  formData.append("event_start_time", data.event_start_time);
  formData.append("event_end_time", data.event_end_time);
  formData.append("street_address", data.street_address);
  formData.append("home_number", data.home_number);
  formData.append("district", data.district);
  formData.append("postal_zip_code", data.postal_zip_code);
  formData.append("state", data.state);
  formData.append("age_range_min", data.age_range_min);
  formData.append("age_range_max", data.age_range_max);
  formData.append("max_guests", data.max_guests);
  formData.append("payment_type", data.payment_type);
  formData.append("price", data.price);

  try {
    const res = await fetch(`${commonUrl}/events/create-event`, {
      method: "POST",
      headers: {
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

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
    return data;
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

type locationData = {
  longitude: string;
  latitude: string;
};

// check-user-availability
export async function check_user_availability(dataObj: {
  latitude: number;
  longitude: number;
}) {
  console.log(dataObj);

  try {
    const res = await fetch(`${commonUrl}/events/check-user-availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
      body: JSON.stringify(dataObj),
    });

    const data = await res.json();
    return data;
  } catch (error) {
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
