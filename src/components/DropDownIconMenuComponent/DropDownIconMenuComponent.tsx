"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FollowHostIcon,
  GestScanIcon,
  MoreOptionIcon,
  RateEventIcon,
  ReportEventIcon,
} from "../../../public/svg-icons/icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FollowHostModel from "../Models/FollowHostModel/FollowHostModel";
import SuccessModel from "../Models/SuccessModel/SuccessModel";
import ErrorModel from "../Models/ErrorModel/ErrorModel";
import { followUser } from "@/routes/following_follower";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

type DropDownIconMenuComponentProps = {
  // Define any props you need here
  event_id?: string;
  host_id?: string;
};

const DropDownIconMenuComponent: React.FC<DropDownIconMenuComponentProps> = ({
  event_id,
  host_id,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [followHostModel, setFollowHostModel] = React.useState(false);

  const handelFollowHost = async () => {
    if (!event_id) return;
    if (!host_id) return;

    try {
      setLoading(true);
      const data = await followUser({ following_id: host_id });
      if (data.success) {
        setSuccess("Host followed successfully");
        setShowSuccessModel(true);
        setTimeout(() => {
          setShowSuccessModel(false);
          setSuccess("");
        }, 3600);
      } else {
        setError(data.message || "Failed to follow host");
        setShowErrorModel(true);
        setTimeout(() => {
          setShowErrorModel(false);
          setError("");
        }, 3600);
      }
    } catch (error) {
      setError("An error occurred while following the host");
      setShowErrorModel(true);
      setTimeout(() => {
        setShowErrorModel(false);
        setError("");
      }, 3600);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreOptionIcon className="text-app-text-primary cursor-pointer" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-app-background-model" align="end">
          <DropdownMenuItem
            onClick={() => {
              router.push(
                `/more-options/chat-pages?source=rate-event&event_id=${event_id}`
              );
            }}
          >
            <RateEventIcon className="text-app-icon" />
            <p className="text-[16px] font-plusJakartaSans-400 text-app-text-medal-model">
              Rate event
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/more-options/chat-pages?source=report-event&event_id=${event_id}`
              )
            }
          >
            <ReportEventIcon className="text-app-icon" />
            <p className="text-[16px] font-plusJakartaSans-400 text-app-text-medal-model">
              Report event
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/more-options/chat-pages?source=guest-scan&event_id=${event_id}`
              )
            }
          >
            <GestScanIcon className="text-app-icon" />
            <p className="text-[16px] font-plusJakartaSans-400 text-app-text-medal-model">
              Guest scan
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFollowHostModel(true)}>
            <FollowHostIcon className="text-white" />
            <p className="text-[16px] font-plusJakartaSans-400 text-app-text-medal-model">
              Follow host
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <FollowHostModel
        isOpen={followHostModel}
        onClose={() => setFollowHostModel(false)}
        onChange={() => {
          setFollowHostModel(false);
          handelFollowHost();
        }}
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

export default DropDownIconMenuComponent;
