"use client";

import React, { Suspense, useEffect, useState } from "react";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import { BackArrow, RateEventIcon } from "../../../../public/svg-icons/icons";
import { paddings } from "@/constants/layout-constants";
import TextAreaComponent from "@/components/TextAreaComponent/TextAreaComponent";
import Image from "next/image";
import MemberModel from "@/components/Models/MemberModel/MemberModel";
import ChatPagesClient from "./ChatPagesClient";

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
      <ChatPagesClient />
    </Suspense>
  );
};

export default page;
