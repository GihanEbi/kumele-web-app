import { useState } from 'react';
// Import our new, structured API service function
import { createCryptoCharge } from '@/routes/cryptoPaymentService/cryptoPaymentService';

interface CryptoPaymentButtonProps {
  productId?: string;
  productName: string;
  description: string;
  amount: number;
}

const CryptoPaymentButton: React.FC<CryptoPaymentButtonProps> = ({
  productId,
  productName,
  description,
  amount,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the service function with the required data
      const response = await createCryptoCharge({
        product_id: productId,
        product_name: productName,
        description: description,
        amount_usd: amount,
      });

      // The service function ensures response.payment_url exists on success
      if (response.payment_url) {
        // This is the main success action: redirect the user to Coinbase to complete the payment.
        window.location.href = response.payment_url;
      } else {
        // This is a fallback, in case the backend response is malformed
        throw new Error('Payment URL not found in the response.');
      }

    } catch (err: any) {
      console.error('Payment initiation failed:', err);
      // The error message comes from the service, which is user-friendly
      setError(err.message || 'An unknown error occurred while initiating payment.');
      setIsLoading(false); // Make sure to stop loading on error
    }
  };

  return (
    <div>
      <button 
        onClick={handlePayment} 
        disabled={isLoading}
        // Add some basic styling for a better user experience
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.7 : 1,
        }}
      >
        {isLoading ? 'Processing...' : `Pay $${amount} with Crypto`}
      </button>

      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default CryptoPaymentButton;