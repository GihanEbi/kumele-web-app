import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

const commonUrl = `${config.baseUrl}/payments`;

type oneTimePayment = {
  amount: string;
  currency: string;
};

type saveCard = {
  paypal_token: string;
  card_type: string;
  last4: string;
};

export const makeOneTimePayment = async (dataObj: oneTimePayment) => {
  try {
    const res = await fetch(`${commonUrl}/orders/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const captureOrder = async (orderID: string) => {
  try {
    const res = await fetch(`${commonUrl}/orders/capture/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify({ orderID }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const saveCard = async (dataObj: saveCard) => {
  try {
    const res = await fetch(`${commonUrl}/cards/save/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`, // Uncomment if you need to send a token
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getUserCards = async () => {
  try {
    const res = await fetch(`${commonUrl}/cards/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`, // Uncomment if you need to send a token
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
};
