"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  CloseIcon2,
  NewEmailIcon,
  NewUserIcon,
} from "../../../public/svg-icons/icons";
import CheckBoxComponent from "../CheckBoxComponent/CheckBoxComponent";

// ---------- Types ----------
export type SubscribeModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (payload: {
    name: string;
    email: string;
    newsletter: boolean;
    agree: boolean;
  }) => void;
  images?: { src: string; alt?: string }[];
  brand?: React.ReactNode;
};

export default function SubscribeModal({
  open,
  onClose,
  onSubmit,
  images = DEFAULT_IMAGES,
  brand = <DefaultBrand />,
}: SubscribeModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newsletter: false,
    agree: false,
  });

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit?.(formData);
    onClose();
    // Reset form
    setFormData({ name: "", email: "", newsletter: false, agree: false });
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-8 sm:px-4"
      aria-hidden={!open}
      onClick={handleOverlayClick}
    >
      <div
        style={{ backgroundColor: "#0D0D0D" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscribe-title"
        className="relative w-full max-w-md rounded-3xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-[20px] inline-flex w-[40px] items-center justify-center"
        >
          <CloseIcon2 className="h-[24px] w-[24px]" />
        </button>

        {/* Header: brand + collage */}
        <div className="px-6 pt-6">
          <div className="flex items-center gap-3 pb-3">{brand}</div>
          <div className="grid grid-cols-3 gap-2">
            {images.slice(0, 6).map((img, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] overflow-hidden rounded-md bg-neutral-800"
              >
                <Image
                  src={img.src}
                  alt={img.alt ?? `Photo ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 480px) 33vw, 160px"
                />
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 pt-6">
          <h3
            id="subscribe-title"
            className="mb-4 font-plusJakartaSans text-[25.48px] font-extrabold"
            style={{ color: "#FFC533" }}
          >
            Subscribe
          </h3>

          {/* Name */}
          <label
            style={{ backgroundColor: "#F4F4F4" }}
            className="mb-3 flex items-center gap-2 rounded-[7.47px] bg-white/10 px-3 py-[2px] ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-amber-400"
          >
            <NewUserIcon className="w-[25.58px] h-[33.66px]" />
            <input
              type="text"
              name="name"
              required
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-[32.88px] bg-transparent placeholder-gray-800 placeholder-font-plusJakartaSans placeholder:font-normal placeholder:text-[13.77px] outline-none"
            />
          </label>

          {/* Email */}
          <label
            style={{ backgroundColor: "#F4F4F4" }}
            className="mb-3 flex items-center gap-2 rounded-[7.47px] bg-white/10 px-3 py-0.5 ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-amber-400"
          >
            <NewEmailIcon className="w-[28.58px] h-[38.66px] -mb-1" />
            <input
              type="email"
              name="email"
              required
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[32.88px] rounded-[7.47px] outline-none placeholder-gray-800 placeholder-font-plusJakartaSans placeholder:font-normal placeholder:text-[13.77px]"
            />
          </label>

          {/* Checkboxes */}
          <div className="space-y-2 pb-2">
            <label className="flex cursor-pointer items-center gap-3 text-sm">
              {/* <div>
                <CheckBoxComponent
                  label=""
                  onChange={handleChange}
                  value={formData.newsletter}
                />
              </div> */}
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="peer hidden"
              />
              <div
                className={`w-[14.62px] h-[14.62px] rounded border-2 ${
                  !formData.newsletter
                    ? "border-app-button-radio"
                    : "border-app-button-blue"
                } flex items-center justify-center`}
              >
                <div
                  className={`w-[7.62px] h-[7.62px] ${
                    !formData.newsletter ? "" : "bg-app-button-blue"
                  } transition-all`}
                />
              </div>
              <span
                style={{ color: "#FFC533" }}
                className="font-plusJakartaSans text-[13px] font-normal"
              >
                Subscribe to our newsletter
              </span>
            </label>

            {/* Agree */}
            <label className="flex cursor-pointer items-center gap-3 text-sm">
               {/* <div>
                <CheckBoxComponent
                  label=" I agree to the Terms & Conditions"
                  onChange={handleChange}
                  value={formData.agree}
                />
              </div> */}
              <input
                required
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="peer hidden"
              />
              <div
                className={`w-[14.62px] h-[14.62px] rounded border-2 ${
                  !formData.agree
                    ? "border-app-button-radio"
                    : "border-app-button-blue"
                } flex items-center justify-center`}
              >
                <div
                  className={`w-[7.62px] h-[7.62px] ${
                    !formData.agree ? "" : "bg-app-button-blue"
                  } transition-all`}
                />
              </div>
              <span>
                <span
                  style={{ color: "#FFC533" }}
                  className="font-plusJakartaSans text-[13px] font-normal"
                >
                  I agree
                </span>
                <span
                  style={{ color: "#808080" }}
                  className="font-plusJakartaSans text-[13px] font-normal"
                >
                  {" "}
                  to the Terms & Conditions
                </span>
              </span>
            </label>
          </div>

          {/* reCAPTCHA note */}
          <div className="mb-4 flex items-center gap-3">
            <div className="relative h-[27px] w-[27px] overflow-hidden rounded">
              <Image
                src="/bg-imgs/auth/robot-img.png"
                alt="reCAPTCHA"
                fill
                className="object-contain p-1"
              />
            </div>
          </div>

          <button
            style={{ backgroundColor: "#FFC533", color: "#0D0D0D" }}
            type="submit"
            className="w-full rounded-[10.33px] bg-amber-400 px-4 py-3 text-center text-base font-plusJakartaSans text-[13.77px] font-normal"
          >
            Subscribe Now
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------- Brand + Icons + Defaults ----------
function DefaultBrand() {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon />
    </div>
  );
}

function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="logo"
      width={53}
      height={39.6}
      className={className}
    />
  );
}

const DEFAULT_IMAGES = [
  { src: "/bg-imgs/event1.jpg", alt: "Hobby Meetup" },
  { src: "/bg-imgs/event2.jpg", alt: "Magic in unity" },
  { src: "/bg-imgs/event3.jpg", alt: "Group" },
  { src: "/bg-imgs/event4.jpg", alt: "Passion" },
  { src: "/bg-imgs/preview-event.jpg", alt: "Fun" },
  { src: "/bg-imgs/test-event-3.jpg", alt: "Community" },
];
