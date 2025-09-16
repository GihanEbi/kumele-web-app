"use client";

import Head from "next/head";
import React, { Suspense, useState } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import ChangePasswordNewPage from "./ResetPassword";

const ChangePasswordPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Suspense>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      <ChangePasswordNewPage />
    </Suspense>
  );
};

export default ChangePasswordPage;
