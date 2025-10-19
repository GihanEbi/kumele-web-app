import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

type PlisioPaymentRequest = {
  amount: number;
  currency: string;
  order_id: string;
};
const commonUrl = `${config.baseUrl}/plisio-payments`;

// create plisio payment
export async function create_plisio_payment(dataObj: PlisioPaymentRequest) {
  try {
    const res = await fetch(`${commonUrl}/create`, {
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
    console.error("Error creating Plisio payment:", error);
    throw error;
  }
}
