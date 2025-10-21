"use client";
import { useEffect, useState, useRef } from "react";
import Location from "../Models/PermissionModels/Location";
import { updateLocation } from "@/routes/signup_and_signin";

export default function CurrentLocation() {
  const [showPopup, setShowPopup] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(
    null
  );

  const locationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to get the current location
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const newLocation = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          setLocation(newLocation);
          await updateLocation(newLocation);
        } catch (error) {
          console.error("❌ Error updating location:", error);
        }
      },
      (err) => {
        console.error("❌ Error getting location:", err);
      }
    );
  };

  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        // Get initial location
        getCurrentLocation();
        setShowPopup(false);

        // Start updating every 15 minutes (900,000 ms)
        locationIntervalRef.current = setInterval(() => {
          getCurrentLocation();
        }, 15 * 60 * 1000); // 15 minutes
      } else if (result.state === "denied") {
        setShowPopup(false);
      } else {
        setShowPopup(true);
      }
    });

    // Cleanup interval when component unmounts
    return () => {
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
    };
  }, []);

  const handleAllow = () => {
    setShowPopup(false);
    getCurrentLocation();

    // Start periodic updates after permission granted
    if (locationIntervalRef.current) clearInterval(locationIntervalRef.current);
    locationIntervalRef.current = setInterval(() => {
      getCurrentLocation();
    }, 15 * 60 * 1000);
  };

  const handleDeny = () => {
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Location
            isOpen={showPopup}
            onClose={(value: string) => {
              if (value === "once" || value === "while_using") {
                handleAllow();
              } else {
                handleDeny();
              }
            }}
          />
        </div>
      )}

      {/* {location && (
        <p className="mt-4 text-sm text-gray-600">
          Your location: {location.latitude}, {location.longitude}
        </p>
      )} */}
    </div>
  );
}
