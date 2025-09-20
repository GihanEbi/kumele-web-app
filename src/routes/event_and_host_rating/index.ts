import { config } from "@/config";
import { getToken } from "@/utils/authUtils";
const commonUrl = `${config.baseUrl}/event-host-ratings`;

// function to create event host rating
export async function createEventHostRating(ratingData: {
  eventId: string;
  hostId: string;
  event_rating: number;
  host_rating: number;
  review: string;
}) {
  try {
    const res = await fetch(`${commonUrl}/create-event-host-rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
      body: JSON.stringify(ratingData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating event host rating:", error);
    throw error;
  }
}

// function to get event rating
export async function getEventRating(eventId: string) {
  try {
    const res = await fetch(
      `${commonUrl}/get-event-average-rating/${eventId}`,
      {
        method: "GET",
        headers: {
          authorization: `${getToken()}`,
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching event rating:", error);
    throw error;
  }
}

// function to get host overall rating
export async function getHostOverallRating(hostId: string) {
  try {
    const res = await fetch(`${commonUrl}/get-host-ratings/${hostId}`, {
      method: "GET",
      headers: {
        authorization: `${getToken()}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching host overall rating:", error);
    throw error;
  }
}
