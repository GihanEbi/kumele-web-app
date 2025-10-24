import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useState } from "react";
import { CloseIcon } from "../../../../public/svg-icons/icons";
import Image from "next/image";

type ReferralModelProps = {
  isOpen: boolean;
  onClose: () => void;
  refCode?: string;
};

const ReferralModel: React.FC<ReferralModelProps> = ({ isOpen, onClose, refCode }) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // --- CONFIGURATION ---
  const referralCode = refCode || "No referral code";
  // IMPORTANT: Replace this with your actual registration page URL
  const registrationBaseUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/authentication/signup`;
  
  // 1. CONSTRUCT THE FULL REFERRAL LINK
  const referralLink = `${registrationBaseUrl}?ref=${referralCode}`;

  // 2. CREATE THE MESSAGE TO BE SHARED
  const shareMessage = `Hey! Join me on Kumele and get a special bonus. Sign up using my referral link: ${referralLink}`;


  // --- FUNCTIONS ---

  const handleCopyToClipboard = async () => {
    // When copying, we copy the full link for convenience
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
      alert("Failed to copy referral link.");
    }
  };

  const handleGenericShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on Kumele!",
          text: shareMessage,
          url: referralLink, // Including the URL separately is best practice for the Web Share API
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web sharing is not supported on your browser. Please copy the link manually.");
    }
  };

  const handleShareToWhatsApp = () => {
    // WhatsApp reads the text and the link together.
    const encodedMessage = encodeURIComponent(shareMessage);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      {/* ... (your modal structure) ... */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-1000"
          onClick={onClose}
        >
          <div
            className={`bg-app-background-model w-full max-w-md p-6 sm:p-8 rounded-t-4xl shadow-xl transform transition-transform duration-300 ease-out ${
              isOpen ? "translate-y-0" : "translate-y-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ... (modal header) ... */}
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold"></h1>
              <button onClick={onClose} aria-label="Close">
                <CloseIcon className="text-app-icon" />
              </button>
            </div>

            <div>
              <h1 className="text-[19px] font-bold text-center">
                Invite your friends to Kumele
              </h1>
              <div className="flex flex-col items-center justify-center">
                <p className="text-[16px] mt-2">Referral code</p>
                <div className="flex items-center gap-2 mt-[9px] p-2">
                  <span className="text-app-text-blue font-bold tracking-widest">
                    {referralCode}
                  </span>
                </div>
              </div>
              <div className="h-px bg-app-border-referral w-full my-5"></div>

              {/* Action Buttons Grid - Now sharing the full link and message */}
              <div className="grid grid-cols-4 gap-y-4 pt-2 mt-4 mb-12">
                <button onClick={handleCopyToClipboard} className="flex flex-col items-center gap-2">
                  <Image src="/images/copy-img.png" alt="Copy" width={40} height={40} />
                  <span className="text-xs text-center">
                    {copied ? "Copied Link!" : <>Copy Link<br />to clipboard</>}
                  </span>
                </button>
                <button onClick={handleGenericShare} className="flex flex-col items-center gap-2">
                  <Image src="/images/blutooth-img.png" alt="Bluetooth" width={40} height={40} />
                  <span className="text-xs text-center">Bluetooth</span>
                </button>
                <button onClick={handleGenericShare} className="flex flex-col items-center gap-2">
                  <Image src="/images/drive-img.png" alt="Drive" width={58} height={58} />
                  <span className="text-xs text-center">Drive</span>
                </button>
                <button onClick={handleShareToWhatsApp} className="flex flex-col items-center gap-2">
                  <Image src="/images/logos_whatsapp.png" alt="WhatsApp" width={56} height={56} />
                  <span className="text-xs text-center">WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferralModel;