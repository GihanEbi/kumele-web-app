import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

const commonUrl = `${config.baseUrl}/language-content`;

export async function get_profile_page_contents() {
  try {
    const res = await fetch(`${commonUrl}/get-profile-page-contents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
