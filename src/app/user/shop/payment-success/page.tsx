"use client";

import { useState, Suspense } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import PaymentSuccessNewPage from "./Payment";

const PaymentSuccessPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Suspense>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      <PaymentSuccessNewPage />
    </Suspense>
  );
};

export default PaymentSuccessPage;
