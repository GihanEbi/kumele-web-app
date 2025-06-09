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
  return (
    <Card
      className={cn(
        "rounded-2xl border-none p-1",
        isActive ? "bg-app-input-yellow" : "bg-app-input-primary"
      )}
    >
      <CardContent className="p-2">
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            {isActive ? (
              <CrownNormalIcon />
            ) : (
              <CrownIcon className="text-app-icon" />
            )}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start">
              <h3
                className={`text-lg font-bold ${
                  isActive ? "text-app-text-black" : "text-app-text-primary"
                } font-plusJakartaSans`}
              >
                {title}
              </h3>
              <p
                className={`text-lg font-bold ${
                  isActive ? "text-app-text-blue" : "text-app-text-yellow"
                } font-plusJakartaSans`}
              >
                {price}
              </p>
            </div>

            {isActive && (
              <p className="text-sm font-bold text-app-text-blue font-plusJakartaSans">
                Active
              </p>
            )}

            <div
              className={cn(
                "text-sm",
                isActive ? "text-app-text-black" : "text-app-text-secondary"
              )}
            >
              {description.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>

            <Button className={`w-3/4 mt-4 rounded-lg font-plusJakartaSans ${isActive ? "bg-app-button-white text-app-text-black" : "bg-app-button-primary text-app-text-tertiary"}`}>
              {isActive ? "Deactivate" : "Activate"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
