"use client";

import React, { Suspense, useEffect } from "react";
import Head from "next/head";
import { useState } from "react";
import { BackArrow } from "../../../../public/svg-icons/icons";
import TabComponent from "@/components/TabComponent/TabComponent";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { paddings } from "@/constants/layout-constants";
import Image from "next/image";
import FollowingComponent from "./FollowingComponent";

const Following = () => {

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Suspense>
      {/* Loading spinner */}
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      <FollowingComponent/>
    </Suspense>
  );
};

export default Following;
