import { config } from "@/config";
import { getToken } from "@/utils/authUtils";
const commonUrl = `${config.baseUrl}/user-events`;

export async function userConfirmedEvent() {
  try {
    const res = await fetch(
      `${commonUrl}/get-confirmed-user-events-by-user-id`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${getToken()}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getUserEventsByEventId(eventId: string) {
  try {
    const res = await fetch(
      `${commonUrl}/get-all-user-events-by-event-id/${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${getToken()}`,
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function userAcceptEvent(eventId: string) {
  try {
    const res = await fetch(`${commonUrl}/accept-user-event/${eventId}`, {
      method: "PUT",
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
