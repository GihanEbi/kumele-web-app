import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

const commonUrl = `${config.baseUrl}/crypto`;

// Interface for the data needed to create a charge
interface CryptoChargeData {
  product_id?: string; // Optional if it's not always for a specific product
  product_name: string;
  description?: string;
  amount_usd: number;
}

// Interface for the expected successful response from the backend
interface CreateChargeResponse {
    success: boolean;
    message: string;
    payment_url: string;
}

/**
 * Calls the backend to create a new Coinbase Commerce charge.
 * @param chargeData - The details of the payment.
 * @returns The backend's response, including the payment_url.
 */
export async function createCryptoCharge(chargeData: CryptoChargeData): Promise<CreateChargeResponse> {
  try {
    const res = await fetch(`${commonUrl}/create-charge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Your existing pattern for authentication
        "authorization": `${getToken()}`, 
      },
      body: JSON.stringify(chargeData),
    });

    const data = await res.json();

    // Handle non-successful HTTP responses (e.g., 400, 500)
    if (!res.ok) {
        // Use the error message from the backend if available, otherwise a generic one
        throw new Error(data.message || 'Failed to create payment charge.');
    }

    return data;
  } catch (error) {
    console.error("Error creating crypto charge:", error);
    // Re-throw the error so the component can catch it and display it to the user
    throw error;
  }
}