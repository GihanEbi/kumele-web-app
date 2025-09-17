"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BuyIcon } from "../../../public/svg-icons/icons";
import CheckMarkGif from "../GifComponents/CheckMarkGif/CheckMarkGif";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import { get_all_product_types, get_products_by_type } from "@/routes/products";
import { add_to_cart } from "@/routes/cart";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

// Define the possible time options
const TIME_OPTIONS = ["24 Hrs", "48 Hrs", "7 Days"] as const; // Use 'as const' for stricter typing
export type TimeOption = (typeof TIME_OPTIONS)[number];

interface TimeDurationSelectorProps {
  handleModalOpen?: () => void;
  handleCloseModal?: () => void;
  isItemAdded: boolean;
  setIsitemAdded: Dispatch<SetStateAction<boolean>>;
  selected?: TimeOption;
  onChange?: (value: TimeOption) => void;
}

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const TimeDurationSelector: React.FC<TimeDurationSelectorProps> = ({
  setIsitemAdded,
  isItemAdded,
  handleCloseModal,
  handleModalOpen,
  selected,
  onChange,
}) => {
  //   loading state
  const [loading, setLoading] = useState(false);

  // selected time state
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // state for product store
  const [productStore, setProductStore] = useState<Product[]>([]);

  const [currentTimeIndex, setCurrentTimeIndex] = useState<number>(() => {
    if (selected) {
      const idx = TIME_OPTIONS.indexOf(selected);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });
  // keep internal index in sync if parent changes the value
  useEffect(() => {
    if (selected) {
      const idx = TIME_OPTIONS.indexOf(selected);
      if (idx >= 0 && idx !== currentTimeIndex) setCurrentTimeIndex(idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // fetch products from backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await get_products_by_type("EVENT_START_TIME");

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

  const currentTime: TimeOption = TIME_OPTIONS[currentTimeIndex];
  const isBlueSectionVisible = currentTime !== "24 Hrs";

  //useScrollLock(isItemAddedSuccess)

  const handleIncrement = () => {
    setCurrentTimeIndex((prev) => {
      const next = Math.min(prev + 1, TIME_OPTIONS.length - 1);
      onChange?.(TIME_OPTIONS[next]);
      setSelectedTime(TIME_OPTIONS[next]);
      return next;
    });
  };

  const handleDecrement = () => {
    setCurrentTimeIndex((prev) => {
      const next = Math.max(prev - 1, 0);
      onChange?.(TIME_OPTIONS[next]);
      setSelectedTime(TIME_OPTIONS[next]);
      return next;
    });
  };

  const handleAddToCartClick = async () => {
    if (!selectedTime) {
      setError("Please select a time duration");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    }

    let selectedProduct: Product | null = null;

    if (selectedTime) {
      selectedProduct =
        productStore.find((product) => product.name === selectedTime) || null;
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
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setError("Error adding to cart");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center p-1  max-w-xs">
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      {/* Time Display Section */}
      <div
        className={`bg-app-background-card-secondary text-app-text-blackandwhite font-plusJakartaSans font-normal text-[13.89px] px-4 py-3 ${
          isBlueSectionVisible ? "rounded-l-lg" : "rounded-lg"
        } min-w-[70px] text-center`}
      >
        {currentTime}
      </div>

      {/* Blue Cart Section (Conditional) */}
      {isBlueSectionVisible && (
        <div
          onClick={handleAddToCartClick}
          className="bg-blue-600 py-[10px] rounded-r-lg px-6"
        >
          <BuyIcon />
        </div>
      )}

      {/* Increment/Decrement Section */}
      <div className="bg-app-background-primary px-3 gap-8 py-3 border rounded-lg flex items-center justify-between min-w-[60px] ml-4">
        <button
          onClick={handleDecrement}
          //disabled={currentTimeIndex === 0}
          className="text-neutral-500 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed font-plusJakartaSans font-normal text-[13.89px]"
          aria-label="Decrease time"
        >
          -
        </button>
        <button
          onClick={handleIncrement}
          //disabled={currentTimeIndex === TIME_OPTIONS.length - 1}
          className="text-neutral-500 dark:text-gray-300  disabled:opacity-40 disabled:cursor-not-allowed font-plusJakartaSans font-normal text-[13.89px]"
          aria-label="Increase time"
        >
          +
        </button>
      </div>
      {isItemAdded && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={handleCloseModal} // Close modal if overlay is clicked
        >
          <div
            className="bg-app-background-primary w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center">
              <div className="mb-4">
                <CheckMarkGif />
              </div>
              <p className="text-app-text-primary font-plusJakartaSans font-normal text-[19px] mb-6 text-center px-8">
                This item has been added to your cart
              </p>
            </div>
          </div>
        </div>
      )}
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

export default TimeDurationSelector;
