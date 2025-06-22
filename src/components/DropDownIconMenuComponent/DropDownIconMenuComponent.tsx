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
import React from "react";
import FollowHostModel from "../Models/FollowHostModel/FollowHostModel";

type DropDownIconMenuComponentProps = {
  // Define any props you need here
};

const DropDownIconMenuComponent: React.FC<
  DropDownIconMenuComponentProps
> = () => {
  const router = useRouter();
  const [followHostModel, setFollowHostModel] = React.useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreOptionIcon className="text-app-text-primary cursor-pointer" />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-app-background-model" align="end">
          <DropdownMenuItem
            onClick={() => {
              router.push(`/more-options/chat-pages?source=rate-event`);
              console.log("Rate event clicked");
            }}
          >
            <RateEventIcon className="text-app-icon" />
            <p className="text-[16px] font-plusJakartaSans-400 text-app-text-medal-model">
              Rate event
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/more-options/chat-pages?source=report-event`)
            }
          >
            <ReportEventIcon className="text-app-icon" />
            <p className="text-[16px] font-plusJakartaSans-400 text-app-text-medal-model">
              Report event
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/more-options/chat-pages?source=guest-scan`)
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
      />
    </div>
  );
};

export default DropDownIconMenuComponent;
