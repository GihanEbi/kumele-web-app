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

