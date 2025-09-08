import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

const commonUrl = `${config.baseUrl}/users`;

type passwordChange = {
  oldPassword: string;
  newPassword: string;
};

export async function changePassword(
  dataObj: passwordChange
) {
  try {
    const res = await fetch(`${commonUrl}/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}