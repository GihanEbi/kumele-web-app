import { config } from "@/config";
import { getToken } from "@/utils/authUtils";
const commonUrl = `${config.baseUrl}/purchase-history`;

// add item to purchase history
export async function add_to_purchase_history(dataObj: { product_id: string }) {
  try {
    const response = await fetch(`${commonUrl}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
      body: JSON.stringify(dataObj),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding to purchase history:", error);
    throw error;
  }
}

// get user purchase history
export async function get_user_purchase_history() {
  try {
    const response = await fetch(`${commonUrl}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching purchase history:", error);
    throw error;
  }
}
