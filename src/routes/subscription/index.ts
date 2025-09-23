import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

// -------types----------
type createSubscriptionForm = {
  subscription_id: string;
  stripe_payment_intent_id: string;
};

const commonUrl = `${config.baseUrl}/subscriptions`;

// create user subscription
export const createUserSubscription = async (
  dataObj: createSubscriptionForm
) => {
  try {
    const res = await fetch(`${commonUrl}/create-user-subscription`, {
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
};

// get all subscription data
export async function get_all_subscriptions() {
  try {
    const res = await fetch(`${commonUrl}/get-all-subscription-data`, {
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

// get user subscription data
export async function get_user_subscription_data() {
  try {
    const res = await fetch(`${commonUrl}/get-all-user-subscriptions`, {
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

// deactivate user subscription
export async function deactivate_user_subscription(subscriptionId: string) {
  try {
    const res = await fetch(
      `${commonUrl}/deactivate-user-subscription/${subscriptionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${getToken()}`, // Ensure getToken() returns a valid token
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get all subscribe and unsubscribed data
export async function get_all_subscribe_and_unsubscribed_data() {
  try {
    const res = await fetch(
      `${commonUrl}/get-all-user-subscriptions-and-unsubscribes`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${getToken()}`, // Ensure getToken() returns a valid token
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
