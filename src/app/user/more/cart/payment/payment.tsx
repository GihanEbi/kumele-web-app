import { useState, useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import type {
  OnApproveData,
  CreateOrderData,
  OnApproveActions,
  CreateOrderActions,
} from "@paypal/paypal-js";
import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

const commonUrl = `${config.baseUrl}/payments`;

interface SavedCard {
  id: number;
  paypal_token_id: string;
  card_brand: string;
  last4: string;
}

const PaymentPage = () => {
  const [{ isPending }] = usePayPalScriptReducer();
  const [cartTotal] = useState("10.00"); // Example amount
  const [saveCard, setSaveCard] = useState(false);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);

  // Fetch saved cards on component mount
  useEffect(() => {
    const fetchCards = async () => {
      console.log("Fetching saved cards...");
      console.log("token:", getToken());

      try {
        const response = await fetch(`${commonUrl}/cards`, {
          // You'll need to include your auth token here
          headers: {
            "Content-Type": "application/json",
            authorization: `${getToken()}`, // Uncomment if you need to send a token
          },
        });
        const result = await response.json();
        if (result.success) {
          setSavedCards(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch saved cards:", error);
      }
    };
    fetchCards();
  }, []);

  // Function to create a PayPal order via our backend
  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    console.log("Creating PayPal order...");

    try {
      const response = await fetch(`${commonUrl}/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${getToken()}`,
        },
        body: JSON.stringify({
          cartTotal: cartTotal,
          vault: saveCard, // Tell backend we want to save this card
        }),
      });
      const order = await response.json();
      if (order.orderID) {
        return order.orderID;
      } else {
        throw new Error("Failed to create order.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the order. Please try again.");
      throw error;
    }
  };

  // Function to handle payment approval
  const onApprove = async (
    data: OnApproveData,
    actions: OnApproveActions
  ): Promise<void> => {
    console.log("Payment approved:", data);
    try {
      // 1. Capture the payment on the backend
      const captureResponse = await fetch(`${commonUrl}/orders/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${getToken()}`,
        },
        body: JSON.stringify({ orderID: data.orderID }),
      });
      const captureResult = await captureResponse.json();
      if (!captureResult.success) {
        throw new Error("Payment capture failed.");
      }

      console.log("Payment successful:", captureResult.data);
      alert("Payment successful!");

      // 2. If user chose to save the card, and the payment source exists, save it
      const paymentSource = captureResult.data?.payment_source;
      if (saveCard && paymentSource?.card) {
        await saveCardToVault(paymentSource.card);
      }
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred during payment approval. Please check your console."
      );
    }
  };

  // Function to save the card token to our database
  const saveCardToVault = async (cardDetails: any) => {
    console.log("Saving card to vault...");
    try {
      const response = await fetch(`${commonUrl}/payments/cards/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${getToken()}`,
        },
        body: JSON.stringify({
          paypal_token_id: cardDetails.attributes.vault.id, // This is the vaulted token
          card_brand: cardDetails.brand,
          last4: cardDetails.last_digits,
        }),
      });
      const result = await response.json();
      if (result.success) {
        console.log("Card saved successfully!");
        // Optionally, refresh the list of saved cards
        setSavedCards((prev) => [...prev, result.data]);
      } else {
        console.error("Failed to save card:", result.message);
      }
    } catch (error) {
      console.error("API error while saving card:", error);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h1>Complete Your Payment</h1>
      <h3>Total: ${cartTotal}</h3>

      {/* List saved cards (This is for display; payment with saved cards is a more advanced flow not covered here but possible) */}
      <div>
        <h4>Your Saved Cards</h4>
        {savedCards.length > 0 ? (
          savedCards.map((card) => (
            <div
              key={card.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              {card.card_brand} ending in {card.last4}
            </div>
          ))
        ) : (
          <p>You have no saved cards.</p>
        )}
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h4>Pay with a new card</h4>

      {isPending ? (
        <p>Loading PayPal...</p>
      ) : (
        <>
          <div>
            <input
              type="checkbox"
              id="save-card"
              checked={saveCard}
              onChange={(e) => setSaveCard(e.target.checked)}
            />
            <label htmlFor="save-card">
              {" "}
              Save this card for future payments
            </label>
          </div>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={(err) => {
              console.error("PayPal Button Error:", err);
              alert("An error occurred with the payment. Please try again.");
            }}
          />
        </>
      )}
    </div>
  );
};

export default PaymentPage;
