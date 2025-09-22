"use client";

import React, { useState, Suspense } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import EventMatched from "./EventMatched";

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
      <EventMatched />
    </Suspense>
  );
};

export default page;
