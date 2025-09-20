"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { Suspense, useState } from "react";
import ScanQR from "./ScanQR";

const page = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Suspense>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      <ScanQR />
    </Suspense>
  );
};

export default page;
