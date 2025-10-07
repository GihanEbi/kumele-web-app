import Image from "next/image";
import { RatingIcon } from "../../../../public/svg-icons/icons";
import MedalGif from "@/components/GifComponents/MedalGif/MedalGif";

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
      <div className="absolute -top-12 left-[-3px] flex items-start space-x-3">
        <div className="relative w-[88px] h-[88px]">
          <Image
            // src={host.avatarSrc}
            src={"/avatar-img/alkesh.png"}
            alt={host.name}
            fill
            className="relative z-10 rounded-full object-cover flex-shrink-0"
          />
        </div>
        <div className="flex flex-col items-start space-y-1.5 pt-2">
          <div className="bg-app-blog-selected-tabs-background text-left text-black rounded-t-lg rounded-br-lg px-3 py-1 shadow-md -ml-7 mt-4 pl-6">
            <p className="font-plusJakartaSans text-black font-extrabold text-[12px] leading-tight">
              {host.followers}{" "}
              <span className="font-plusJakartaSans text-black font-semibold text-[12px] leading-tight">
                followers{" "}
              </span>
            </p>
            <div className="flex items-center space-x-1">
              <RatingIcon />
              <span
                style={{ color: "#464646" }}
                className="font-plusJakartaSans font-medium text-[11px]"
              >
                4.3/5 from 120 reviews
              </span>
            </div>
            <p
              style={{ color: "#464646" }}
              className="font-plusJakartaSans font-medium text-[11px]"
            >
              92% Event Completion
            </p>
          </div>
        </div>
      </div>

      <div className="flex-grow mt-2">
        <div className="flex items-center mb-1">
          <h3 className="font-plusJakartaSans text-app-button-model-text-color font-bold text-[19px]">
            Host
          </h3>

          <div className="ml-3 relative flex items-center">
            {/* <Image alt="medal" src="/images/medal.png" width={19.96} height={19.96} /> */}
            <MedalGif width={19.96} height={19.96} />
            {/* <div className="absolute -top-4 -right-4 bg-app-blog-selected-tabs-background text-black text-[10.98px] font-extrabold w-[21.95px] h-[21.95px] rounded-full flex items-center justify-center  dark:border-zinc-800">
              {host.levelIcon}
            </div> */}

            <div className="absolute -top-3 -right-4 rounded-full bg-app-input-yellow text-black py-[2px] w-[21.95px] h-[21.95px]">
              <p className="text-[10.52px]">25</p>
            </div>
          </div>
          <span className="ml-0 mt-2 font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px]">
            {host.level}
          </span>
        </div>

        <div
          className="mt-1 space-y-2 overflow-y-auto max-h-28 pr-4
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <p className="font-plusJakartaSans text-left text-app-button-model-text-color font-bold text-[13px]">
            About {host.name}:{" "}
            <span className="font-plusJakartaSans text-left text-app-button-model-text-color font-normal text-[13px]">
              {host.aboutBio}
            </span>
          </p>
          <p></p>
          {/* <p className="mt-4  text-left font-plusJakartaSans text-app-button-model-text-color font-normal text-[13px]  leading-relaxed">
            {host.aboutBio}
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default HostInfo;
