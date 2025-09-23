import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

const commonUrl = `${config.baseUrl}/stripe`;

// create payment intent
export async function create_payment_intent(amount: string) {
  try {
    const res = await fetch(`${commonUrl}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
      body: JSON.stringify({ amount }), // Hardcoded amount for testing
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

type verify = {
  paymentIntentId: string;
};

// create payment intent
export async function verify_payment_intent(dataObj: verify) {
  try {
    const res = await fetch(`${commonUrl}/verify-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
      body: JSON.stringify(dataObj), // Hardcoded amount for testing
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
