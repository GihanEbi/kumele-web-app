import Image from "next/image";
import { RatingIcon } from "../../../../../../public/svg-icons/icons";

type HostInfoProps = {
  host: {
    name: string;
    avatarSrc: string;
    followers: number;
    rating: number;
    level: string;
    levelIcon: string;
    aboutTitle: string;
    aboutBio: string;
  };
};

const SealIcon = ({ className }: { className?: string }) => ({});

const HostInfo = ({ host }: HostInfoProps) => {
  return (
    <div className="relative bg-app-bg-color-modal rounded-2xl p-4 pt-12 mt-10">
      <div className="absolute -top-8 left-4 flex items-start space-x-3">
        <Image
          src={host.avatarSrc}
          alt={host.name}
          width={88}
          height={88}
          className="relative z-10 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex flex-col items-start space-y-1.5 pt-2">
          <div className="bg-app-blog-selected-tabs-background text-black rounded-lg px-3 py-1.5 shadow-md -ml-7 mt-4 pl-6">
            <p className="font-plusJakartaSans text-black font-semibold text-[13px] leading-tight">
              {host.followers} followers
            </p>
            <div className="flex items-center space-x-1 mt-0.5">
              <RatingIcon />
              <span className="font-plusJakartaSans text-black font-medium text-[11px]">
                {host.rating} Overall Ratings
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow mt-2">
        <div className="flex items-center mb-3">
          <h3 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[19px]">
            Host
          </h3>

          <div className="ml-3 relative flex items-center">
            <Image alt="medal" src="/images/medal.png" width={20} height={20} />
            {/* <SealIcon /> */}
            <div className="absolute -top-3 -right-2 bg-app-blog-selected-tabs-background text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-gray-100 dark:border-zinc-800">
              {host.levelIcon}
            </div>
          </div>
          <span className="ml-4 font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px]">
            {host.level}
          </span>
        </div>

        <div
          className="mt-1 space-y-2 overflow-y-auto max-h-28 pr-4
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <p className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[13px]">
            About {host.name}: {host.aboutTitle}
          </p>
          <p></p>
          <p className="font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px]  leading-relaxed">
            {host.aboutBio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HostInfo;
