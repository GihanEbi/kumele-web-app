"use client";

import React, {
  useState,
  useRef,
  KeyboardEvent,
  ChangeEvent,
  useEffect,
} from "react";

import { TwoTicketsIcon, BuyIcon } from "../../../../../public/svg-icons/icons";

import GuestInviteModal from "./GuestInviteModal/GuestInviteModal";
import { PayPalPayModal } from "@/components/PaymentModal/PayPalModal/PayPalPayModal";
import { AddCardModal } from "@/components/PaymentModal/AddNewCard/AddNewCard";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import { get_all_product_types, get_products_by_type } from "@/routes/products";
import { add_to_cart } from "@/routes/cart";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

interface GuestCounterProps {
  label?: string;
  initialGuests?: number; // Number between 0 and 99
  onAddToCart?: (guests: number) => void;
  isSuccess: boolean;
  setIsSuccess: (value: boolean) => void;
  isInviteModalOpen: boolean;
  setIsInviteModalOpen: (value: boolean) => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const GuestCounter: React.FC<GuestCounterProps> = ({
  initialGuests = 1,
  onAddToCart,
  isSuccess,
  setIsSuccess,
  isInviteModalOpen,
  setIsInviteModalOpen,
}) => {
  //   loading state
  const [loading, setLoading] = useState(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [digit1, setDigit1] = useState<string>("");
  const [digit2, setDigit2] = useState<string>("");
  const [digit3, setDigit3] = useState<string>("");

  const input1Ref = useRef<HTMLInputElement>(null!);
  const input2Ref = useRef<HTMLInputElement>(null!);
  const input3Ref = useRef<HTMLInputElement>(null!);

  const [guestCount, setGuestCount] = useState(initialGuests);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCardAddModalOpen, setIsCardAddModalOpen] = useState(false);

  // state for product store
  const [productStore, setProductStore] = useState<Product[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess) {
      timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await get_products_by_type("NO_OF_GESTURES");

      if (data.success) {
        setProductStore(data.data);
      } else {
        setProductStore([]);
        setError("No products found");
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Error fetching products");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
    } finally {
      setLoading(false);
    }
  };

  const updateDigitsFromCount = (count: number) => {
    const paddedStr = count.toString().padStart(3, "0");
    setDigit1(paddedStr[0]);
    setDigit2(paddedStr[1]);
    setDigit3(paddedStr[2]);
  };

  useEffect(() => {
    updateDigitsFromCount(guestCount);
  }, []);

  const parseGuests = () => {
    const d1 = digit1 || "0";
    const d2 = digit2 || "0";
    const d3 = digit3 || "0";
    return parseInt(`${d1}${d2}${d3}`, 10);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    digitSetter: React.Dispatch<React.SetStateAction<string>>,
    nextInputRef?: React.RefObject<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      digitSetter(value);
      if (value && nextInputRef?.current) {
        nextInputRef.current.focus();
        nextInputRef.current.select();
      }
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    prevInputRef?: React.RefObject<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      e.currentTarget.value === "" &&
      prevInputRef?.current
    ) {
      prevInputRef.current.focus();
    }
  };

  const handleAddToCartClick = async () => {
    const guests = parseGuests();
    if (guests < 1 || guests > 150) {
      setError("Please enter a number between 1 and 150.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    }
    if (onAddToCart) {
      onAddToCart(guests);
    }
    if (guests < 6) {
      return;
    }
    console.log("Adding to cart for guests:", guests);
    
    let selectedProduct: Product | null = null;

    // get the min amount and max amount of the guests using name in productStore
    for (const product of productStore) {
      const nameParts = product.name.split("-");
      if (nameParts.length === 2) {
        const minGuests = parseInt(nameParts[0], 10);
        const maxGuests = parseInt(nameParts[1], 10);
        if (guests >= minGuests && guests <= maxGuests) {
          selectedProduct = product;
          break;
        }
      }
    }

    setLoading(true);
    try {
      const data = await add_to_cart({
        product_id: selectedProduct ? selectedProduct.id : "",
        quantity: 1,
      });
      if (data.success) {
        setSuccess("Item added to cart.");
        setShowSuccessModel(true);
        setTimeout(() => setShowSuccessModel(false), 3600);
      } else {
        setError(data.message || "Failed to add item to cart");
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
        return;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Error adding to cart");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = (finalCount: number) => {
    setGuestCount(finalCount);

    updateDigitsFromCount(finalCount);
    setIsInviteModalOpen(false);
  };

  return (
    <div className="w-full max-w-xs">
      {" "}
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      <div className="flex items-stretch">
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="flex items-center bg-app-input-primary pl-3 pr-2 py-2 rounded-l-lg border-app-input-primary border-r-0  gap-3"
        >
          <TwoTicketsIcon />

          <div className="flex items-center border gap-3 rounded-lg">
            {/* Input 1 */}
            <input
              ref={input1Ref}
              type="text"
              maxLength={1}
              value={digit1}
              onChange={(e) => handleInputChange(e, setDigit1, input2Ref)}
              onKeyDown={(e) => handleKeyDown(e)}
              className="w-5 h-7 text-center text-app-text-secondary bg-transparent focus:outline-none appearance-none pl-2"
              aria-label="First digit of guest count"
            />
            <span className="text-app-text-secondary select-none">|</span>

            {/* Input 2 - corrected onChange to focus the new third input */}
            <input
              ref={input2Ref}
              type="text"
              maxLength={1}
              value={digit2}
              onChange={(e) => handleInputChange(e, setDigit2, input3Ref)}
              onKeyDown={(e) => handleKeyDown(e, input1Ref)}
              className="w-5 h-7 text-center text-app-text-secondary bg-transparent focus:outline-none appearance-none"
              aria-label="Second digit of guest count"
            />
            <span className="text-app-text-secondary select-none">|</span>

            <input
              ref={input3Ref}
              type="text"
              maxLength={1}
              value={digit3}
              onChange={(e) => handleInputChange(e, setDigit3)}
              onKeyDown={(e) => handleKeyDown(e, input2Ref)}
              className="w-5 h-7 text-center text-app-text-secondary bg-transparent focus:outline-none appearance-none pr-2"
              aria-label="Third digit of guest count"
            />
          </div>
        </button>

        {/* Right blue button */}
        <button
          onClick={handleAddToCartClick}
          className="bg-app-button-blue  text-white px-4 py-2 rounded-r-lg flex items-center justify-center"
          aria-label="Add to cart"
        >
          <BuyIcon />
        </button>
      </div>
      <GuestInviteModal
        isOpen={isInviteModalOpen}
        onClose={handleModalClose}
        initialGuests={guestCount}
        maxGuests={150}
      />
      <PayPalPayModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onAddNewCardClick={() => setIsCardAddModalOpen(true)}
      />
      <AddCardModal
        isOpen={isCardAddModalOpen}
        onClose={() => setIsCardAddModalOpen(false)}
      />
      <SuccessModel
        isOpen={showSuccessModel}
        onClose={() => {
          setShowSuccessModel(false);
          setSuccess("");
        }}
        successMessage={success || ""}
      />
      <ErrorModel
        isOpen={showErrorModel}
        onClose={() => {
          setShowErrorModel(false);
          setError("");
        }}
        errorMessage={error || ""}
      />
    </div>
  );
};

export default GuestCounter;
