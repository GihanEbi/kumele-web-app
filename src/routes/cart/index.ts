import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

//-------types----------
type CartItem = {
  product_id: string;
  quantity: number;
};
const commonUrl = `${config.baseUrl}/cart`;

// add to cart
export async function add_to_cart(dataObj: CartItem) {
  try {
    const res = await fetch(`${commonUrl}/add-item`, {
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
    console.error("Error adding to cart:", error);
    throw error;
  }
}

// remove from cart
export async function remove_from_cart(itemId: string) {
  try {
    const res = await fetch(`${commonUrl}/remove-item/${itemId}`, {
      method: "DELETE",
      headers: {
        authorization: `${getToken()}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
}

// get user cart data
export async function get_user_cart() {
  try {
    const res = await fetch(`${commonUrl}/get-user-cart`, {
      method: "GET",
      headers: {
        authorization: `${getToken()}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user cart:", error);
    throw error;
  }
}
