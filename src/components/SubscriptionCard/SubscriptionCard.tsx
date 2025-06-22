"use client";

import React from "react";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CrownIcon, CrownNormalIcon } from "../../../public/svg-icons/icons";

type SubscriptionCardProps = {
  plan: {
    title: string;
    price: string;
    priceColor: string;
    description: string[];
    isActive: boolean;
  };
};

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ plan }) => {
  const { title, price, priceColor, description, isActive } = plan;

  const [activeCard, setActiveCard] = React.useState<boolean>(isActive);
  return (
    <Card
      className={cn(
        "rounded-2xl border-none p-1",
        activeCard ? "bg-app-input-yellow" : "bg-app-input-primary"
      )}
    >
      <CardContent className="p-2">
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            {activeCard ? (
              <CrownNormalIcon />
            ) : (
              <CrownIcon className="text-app-icon" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3
                className={`text-[19px] font-semibold ${
                  activeCard ? "text-app-text-black" : "text-app-text-primary"
                } font-plusJakartaSans-700`}
              >
                {title}
              </h3>
              <p
                className={`text-[19px] font-semibold ${
                  activeCard ? "text-app-text-blue" : "text-app-text-yellow"
                } font-plusJakartaSans-700`}
              >
                {price}
              </p>
            </div>

            {activeCard && (
              <p className="text-[15px] font-bold text-app-text-blue font-plusJakartaSans-700">
                Active
              </p>
            )}

            <div
              className={cn(
                "text-sm mt-[5px] font-plusJakartaSans-400",
                activeCard ? "text-app-text-black" : "text-app-text-secondary"
              )}
            >
              {description.map((line, index) => (
                <p className="text-sm" key={index}>
                  {line}
                </p>
              ))}
            </div>

            <Button
              className={`w-3/4 mt-[12px] rounded-lg text-[16px] font-plusJakartaSans-400 ${
                activeCard
                  ? "bg-app-button-white text-app-text-black"
                  : "bg-app-button-primary text-app-text-tertiary"
              }`}
              onClick={() => setActiveCard(!activeCard)}
            >
              {activeCard ? "Deactivate" : "Activate"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
