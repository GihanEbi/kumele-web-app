"use client";

import InputComponent from "../../../components/InputComponent/InputComponent";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

import {
  RightIcon,
  UploadImageIcon,
  BackToPageIcon,
  InformationIcon,
} from "../../../../public/svg-icons/icons";
import TimeDurationSelector, {
  TimeOption,
} from "@/components/TimeDurationSelector/TimeDurationSelector";

import DatePicker from "@/components/DatePicker/DatePickerUpdate";

import UserAvailabilityCheck from "@/components/EventUserAvailabilityCheck/UserAvailabilityCheck";
import RadixAgeRangeSlider from "@/components/AgeRangeSlider/AgeRangeSlider";
import GuestCounter from "./GuestCounter/GuestCounter";
import PaymentSelection from "./PaymentSelection/PaymentSelection";
import UsersAroundModal from "./UserAvailabilityModal/UserAvailabilityModal";
import TimePickerWithModal from "@/components/TimePicker/TimePickerUpdate";
import EventPreviewModal from "./EventPreviewModal/EventPreviewModal";
import GuestPricesModal from "./GuestPriceModal/GuestPriceModal";
import EventsTimeDetailsModal from "./EventsStartDetailsModal/EventStartDetails";
import Link from "next/link";
import { useScrollLock } from "@/utils/useScrollHook";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import VerticalHobbyScroller from "@/components/VerticalHobbyScroller/VerticalHobbyScroller";
import { createEvent } from "@/routes/Events";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import axios from "axios";

// Define the data for payment options directly in the parent
interface OptionConfig {
  id: string;
  mainLabel: string;
  valueText: string;
  value: string;
  isInput?: boolean;
}

type ChooseInterestsProps = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type EventCreationPayload = {
  category_id: string;
  destination: string;
  event_image: string;
  event_name: string;
  subtitle: string;
  description: string;
  event_start_in: string;
  event_date: string;
  event_start_time: string;
  event_end_time: string;
  street_address: string;
  home_number: string;
  district: string;
  postal_zip_code: string;
  state: string;
  age_range_min: string;
  age_range_max: string;
  max_guests: string;
  payment_type: string;
  price: string;
};
//payment option(need to move into utils file)
const paymentOptionsConfig: OptionConfig[] = [
  {
    id: "payment-free",
    mainLabel: "Free Event",
    valueText: "Free",
    value: "free",
    isInput: false,
  },
  {
    id: "payment-card",
    mainLabel: "Card Payment",
    valueText: "20$",
    value: "card_payment",
    isInput: true,
  },
  {
    id: "payment-cash",
    mainLabel: "Cash On Entry",
    valueText: "50$",
    value: "cash_on_entry",
    isInput: true,
  },
];

//maximum characters define for event description text area
const maxCharacters = 1200;

type FormErrors = Record<string, string>;

const CreateEventSection = () => {
  // loading
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // form data
  const [form, setForm] = useState<EventCreationPayload>({
    category_id: "",
    destination: "events",
    event_image: "",
    event_name: "",
    subtitle: "",
    description: "",
    event_start_in: "24 Hrs",
    event_date: "",
    event_start_time: "",
    event_end_time: "",
    street_address: "",
    home_number: "",
    district: "",
    postal_zip_code: "",
    state: "",
    age_range_min: "18",
    age_range_max: "28",
    max_guests: "",
    payment_type: "",
    price: "",
  });
  // form errors
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Selected duration for "event_start_in"
  const [eventStartIn, setEventStartIn] = useState<TimeOption>("24 Hrs");

  // pickers/modals
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDatePickerOpen, setDatePickerOpen] = useState<boolean>(false);
  const [isStartTimePickerOpen, setIsStartTimePickerOpen] =
    useState<boolean>(false);
  const [isEndTimePickerOpen, setIsEndTimePickerOpen] =
    useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [isGuestPriceModalOpen, setIsGuestPriceModalOpen] =
    useState<boolean>(false);
  const [isEventTimePriceModalOpen, setIsEventTimePriceModalOpen] =
    useState<boolean>(false);
  const [isTimeDurationModalOpen, setIsTimeDurationModalOpen] =
    useState<boolean>(false);

  // times
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");

  const [isAddedCartSuccess, setIsAddedCardSuccess] = useState<boolean>(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<string>("free");
  const [selectedDate, setSelectedDate] = useState<string>(""); // NEW (YYYY-MM-DD)

  //dark theme identification
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  //custom hook for scrolling locking when preview open custom hook calling
  useScrollLock(isPreviewOpen);
  useScrollLock(isTimeDurationModalOpen);
  useScrollLock(isInviteModalOpen);
  useScrollLock(isEndTimePickerOpen);
  useScrollLock(isStartTimePickerOpen);
  useScrollLock(isModalOpen);

  // -------- handleChange for input fields ---------
  const handleInputChange = (value: string | Boolean, name: string) => {
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // -------------------- handlers --------------------

  //function for handle event start time
  const handleStartTimeChange = (newTime: string) => {
    setSelectedStartTime(newTime);
  };

  // //function for handle event end time
  const handleEndTimeChange = (newTime: string) => {
    setSelectedEndTime(newTime);
  };

  // //function for handle event date
  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  //modal open handle
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    if (isModalOpen === true) {
      setIsModalOpen(false);
    }
  };

  const handleSetDatePickerOpen = (isOpen: boolean) => {
    setDatePickerOpen(isOpen);
    if (isOpen) {
      setIsStartTimePickerOpen(false);
      setIsEndTimePickerOpen(false);
    }
  };

  const handleSetStartTimePickerOpen = (isOpen: boolean) => {
    setIsStartTimePickerOpen(isOpen);
    if (isOpen) {
      setDatePickerOpen(false);
      setIsEndTimePickerOpen(false);
    }
  };
  //time picker selection clocks handling
  const handleSetEndTimePickerOpen = (isOpen: boolean) => {
    setIsEndTimePickerOpen(isOpen);
    if (isOpen) {
      setDatePickerOpen(false);
      setIsStartTimePickerOpen(false);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUserAvailability = (available: boolean) => {
    setIsAvailable(available);
    openModal();
    // Add your API call or logic here
  };
  const handleAgeRangeChange = (values: [number, number]) => {
    handleInputChange(values[0].toString(), "age_range_min");
    handleInputChange(values[1].toString(), "age_range_max");
  };

  const handleGuestAddToCart = (guests: number) => {
    handleInputChange(guests.toString(), "max_guests");
    // setIsAddedCardSuccess(true);
    // Add your cart logic here
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedPayment(newValue);
    handleInputChange(newValue, "payment_type");
    setForm((prev) => ({ ...prev, price: "" }));
    // Update your form state or perform actions based on the selection
  };

  const handleEventTimePriceModalOpen = () => {
    if (isDatePickerOpen) {
      setDatePickerOpen(false);
    }
    if (isEndTimePickerOpen) {
      setIsEndTimePickerOpen(false);
    }
    if (isStartTimePickerOpen) {
      setIsStartTimePickerOpen(false);
    }

    setIsEventTimePriceModalOpen(true);
  };

  const handleGuestPriceModalOpen = () => {
    if (isDatePickerOpen) {
      setDatePickerOpen(false);
    }
    if (isEndTimePickerOpen) {
      setIsEndTimePickerOpen(false);
    }
    if (isStartTimePickerOpen) {
      setIsStartTimePickerOpen(false);
    }
    setIsGuestPriceModalOpen(!isGuestPriceModalOpen);
  };

  const handleTimeDurationInnerModalOpen = () => {
    setIsTimeDurationModalOpen(true);
    setIsStartTimePickerOpen(false);
    setIsEndTimePickerOpen(false);
  };

  const handleTimeDurationInnerModalClose = () => {
    setIsTimeDurationModalOpen(false);
  };

  //  preview open
  const handlePreviewOpen = () => {
    form.event_date = selectedDate;
    form.event_start_time = selectedStartTime;
    form.event_end_time = selectedEndTime;
    // validate form
    console.log(form);
    
    const isValid = formValidation();
    console.log(isValid);
    
    if (!isValid) return;

    setIsPreviewOpen(true);
  };

  const handleEventCreate = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const data = await createEvent(form);
      if (data.success) {
        setSuccess("Your event has been created successfully.");
        setShowSuccessModel(true);
        setTimeout(() => setShowSuccessModel(false), 3600);
        // reset form
        setForm({
          category_id: "",
          destination: "events",
          event_image: "",
          event_name: "",
          subtitle: "",
          description: "",
          event_start_in: "24 Hrs",
          event_date: "",
          event_start_time: "",
          event_end_time: "",
          street_address: "",
          home_number: "",
          district: "",
          postal_zip_code: "",
          state: "",
          age_range_min: "",
          age_range_max: "",
          max_guests: "",
          payment_type: "",
          price: "0$",
        });
        setImagePreview(null);
        setIsPreviewOpen(false);
        // navigate to user home after event creation
        router.push("/user/home");
      } else {
        setError(data?.message || "An error occurred");
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
        return;
      }
    } catch (error) {
      setError("An error occurred");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
    } finally {
      setLoading(false);
    }
  };

  // validation
  const formValidation = () => {
    // check if category_id is empty in form
    if (!form.category_id) {
      setError("Please select an event category.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (!form.event_image) {
      setError("Please upload an event image.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (!form.event_name) {
      setFormErrors((prev) => ({
        ...prev,
        event_name: "Event name is required.",
      }));
      return false;
    } else if (!form.subtitle) {
      setFormErrors((prev) => ({
        ...prev,
        subtitle: "Event subtitle is required.",
      }));
      return false;
    } else if (!form.description) {
      setFormErrors((prev) => ({
        ...prev,
        description: "Event description is required.",
      }));
      return false;
    } else if (!form.event_date) {
      setFormErrors((prev) => ({
        ...prev,
        event_date: "Event date is required.",
      }));
      return false;
    } else if (!form.event_start_time) {
      setFormErrors((prev) => ({
        ...prev,
        event_start_time: "Event start time is required.",
      }));
      return false;
    } else if (!form.event_end_time) {
      setFormErrors((prev) => ({
        ...prev,
        event_end_time: "Event end time is required.",
      }));
      return false;
    } else if (!form.street_address) {
      setFormErrors((prev) => ({
        ...prev,
        street_address: "Street address is required.",
      }));
      return false;
    } else if (!form.home_number) {
      setFormErrors((prev) => ({
        ...prev,
        home_number: "Home number is required.",
      }));
      return false;
    } else if (!form.district) {
      setFormErrors((prev) => ({
        ...prev,
        district: "District is required.",
      }));
      return false;
    } else if (!form.postal_zip_code) {
      setFormErrors((prev) => ({
        ...prev,
        postal_zip_code: "Postal/Zip code is required.",
      }));
      return false;
    } else if (!form.state) {
      setFormErrors((prev) => ({
        ...prev,
        state: "State is required.",
      }));
      return false;
    } else if (!form.age_range_min || !form.age_range_max) {
      setFormErrors((prev) => ({
        ...prev,
        age_range: "Please select an age range.",
      }));
      return false;
    } else if (!form.max_guests) {
      setFormErrors((prev) => ({
        ...prev,
        max_guests: "Please specify the number of guests.",
      }));
      return false;
    } else if (!form.payment_type) {
      setFormErrors((prev) => ({
        ...prev,
        payment_type: "Please select a payment method.",
      }));
      return false;
    } else if (isStartLater(form.event_start_time, form.event_end_time)) {
      setError("Event end time must be later than start time.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (new Date(form.event_date) < new Date()) {
      setError("Event date cannot be in the past.");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else {
      return true;
    }
  };
  function isStartLater(startTime: string, endTime: string): boolean {
    const parseTime = (timeStr: string): number => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) {
        hours += 12;
      }
      if (modifier === "AM" && hours === 12) {
        hours = 0;
      }

      return hours * 60 + minutes; // convert to total minutes
    };

    const startMinutes = parseTime(startTime);
    const endMinutes = parseTime(endTime);

    return startMinutes > endMinutes;
  }

  return (
    <div
      className={`max-w-full mx-auto p-6 px-8 no-scrollbar ${
        isDatePickerOpen && isDark
          ? "bg-neutral-900"
          : isDatePickerOpen && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      }   rounded-lg ${
        (isStartTimePickerOpen || isEndTimePickerOpen) && isDark
          ? "bg-neutral-900"
          : (isStartTimePickerOpen || isEndTimePickerOpen) && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      } ${
        isModalOpen && isDark
          ? "bg-neutral-900"
          : isModalOpen && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      } ${
        isAddedCartSuccess && isDark
          ? "bg-neutral-900"
          : isAddedCartSuccess && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      } ${
        isInviteModalOpen && isDark
          ? "bg-neutral-900"
          : isInviteModalOpen && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      } ${
        isPreviewOpen && isDark
          ? "bg-neutral-900"
          : isPreviewOpen && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      }  ${
        isTimeDurationModalOpen && isDark
          ? "bg-neutral-900"
          : isTimeDurationModalOpen && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      } ${
        isGuestPriceModalOpen && isDark
          ? "bg-neutral-900"
          : isGuestPriceModalOpen && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      } ${
        isEventTimePriceModalOpen && isDark
          ? "bg-neutral-900"
          : isEventTimePriceModalOpen && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      }`}
      onClick={closeModal}
    >
      {loading && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <LoadingComponent />
        </div>
      )}
      <div className="flex flex-row gap-5 pt-[64px] -ml-3">
        <div className="mt-2">
          <Link href="/user/home">
            <BackToPageIcon />
          </Link>
        </div>

        <h2 className="font-plusJakartaSans font-bold text-[23px] mb-6">
          Create event
        </h2>
      </div>

      {/* Event Category Section */}
      <div className="mb-6">
        <p className="font-plusJakartaSans font-normal text-[13.89px] text-app-text-primary mb-3">
          Event Category
        </p>
        <VerticalHobbyScroller
          selectedValue={form.category_id}
          onChange={(value: ChooseInterestsProps) => {
            handleInputChange(value.id, "category_id");
          }}
        />
      </div>

      {/* Event Image Section */}
      <div className="mb-6">
        <label className="block font-plusJakartaSans font-normal text-[13.89px] mb-2">
          Event Image
        </label>
        <p className="text-text-sub-caption mb-3 font-plusJakartaSans font-normal text-[11.29px] text-gray-500">
          (Recommended size 400*400px and max size 2MB)
        </p>

        <div
          onClick={triggerFileInput}
          className={` ${
            imagePreview ? "" : "border-2 border-dashed"
          } border-gray-500 rounded-lg p-5 text-center cursor-pointer transition-colors`}
        >
          {imagePreview ? (
            <div className="relative w-full h-30 rounded-md overflow-hidden">
              <Image
                src={imagePreview}
                alt="Event preview"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          ) : (
            <>
              <div className="mx-auto h-8 w-8 text-gray-400">
                <UploadImageIcon />
              </div>

              <p className="font-plusJakartaSans font-normal text-[11.29px] text-gray-500">
                Upload an image
              </p>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e: any) => {
              const file = e.target.files[0];
              if (!file) return;

              const maxSize = 2 * 1024 * 1024; // 2 MB in bytes
              if (file.size > maxSize) {
                setError("File size exceeds 2MB limit.");
                setShowErrorModel(true);
                setTimeout(() => {
                  setShowErrorModel(false);
                }, 3600);
                return;
              }
              setImagePreview(URL.createObjectURL(e.target.files[0]));
              handleInputChange(e.target.files[0], "event_image");
            }}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {/* PayPal Connected Section */}
      <div className="flex items-center justify-between  p-3 rounded-lg">
        <div className="flex items-center">
          <Image
            src="/images/paypal.png"
            alt="paypal"
            width={20}
            height={20}
            className="mr-3"
          />
          <span className="font-plusJakartaSans font-medium text-[13.89px]">
            PayPal Connected
          </span>
          <div className="flex bg-gray-100 dark:bg-neutral-900 ml-3 p-2 rounded-md">
            <RightIcon />
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-6">
        {/* Event Name */}
        <div>
          <label className="block font-plusJakartaSans font-normal text-[13.89px] mb-3">
            Event Name
          </label>
          <InputComponent
            placeholder="Add a title"
            value={form.event_name}
            onChange={(e) => {
              handleInputChange(e.target.value, "event_name");
            }}
            error={formErrors.event_name}
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block font-plusJakartaSans font-normal text-[13.89px] mb-3">
            Subtitle
          </label>
          <InputComponent
            placeholder="Add a subtitle"
            value={form.subtitle}
            onChange={(e) => {
              handleInputChange(e.target.value, "subtitle");
            }}
            error={formErrors.subtitle}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-plusJakartaSans font-normal text-[13.89px] mb-3">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => {
              handleInputChange(e.target.value, "description");
            }}
            maxLength={maxCharacters}
            placeholder="More About the event"
            className={`w-full h-32 p-3 bg-app-input-primary  rounded-lg text-sm focus:ring-1 focus:ring-yellow-400 placeholder-gray-500 resize-none ${
              formErrors.description && "border border-red-500"
            }`}
          />
          <p className="font-plusJakartaSans font-normal text-[10px] text-app-text-secondary mt-1 text-right">
            {form.description.length}/{maxCharacters} Max
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-row gap-3 mb-3 mt-6">
          <label className="block font-plusJakartaSans font-normal text-[13.89px] -mb-1">
            Event starts in
          </label>
          <div onClick={handleEventTimePriceModalOpen} className="mt-[-6px]">
            <InformationIcon />
          </div>
        </div>
        <TimeDurationSelector
          isItemAdded={isTimeDurationModalOpen}
          setIsitemAdded={setIsTimeDurationModalOpen}
          handleModalOpen={handleTimeDurationInnerModalOpen}
          handleCloseModal={handleTimeDurationInnerModalClose}
          selected={eventStartIn} // NEW
          onChange={setEventStartIn}
        />
      </div>

      <div
        className={`mt-8 ${formErrors.event_date && "border border-red-500"}`}
      >
        <DatePicker
          label="Date"
          isOpen={isDatePickerOpen}
          setIsOpen={handleSetDatePickerOpen}
          onChange={handleDateChange}
          //currentDateDisplay="Tuesday, 25th June, 2024"
          //onClick={handleDateClick}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-8">
        <TimePickerWithModal
          label="Event Start time"
          currentTimeDisplay={selectedStartTime}
          onChange={handleStartTimeChange}
          isOpen={isStartTimePickerOpen}
          setIsOpen={handleSetStartTimePickerOpen}
        />
        <TimePickerWithModal
          label="Event End time"
          currentTimeDisplay={selectedEndTime}
          onChange={handleEndTimeChange}
          isOpen={isEndTimePickerOpen}
          setIsOpen={handleSetEndTimePickerOpen}
        />
      </div>
      <div className="space-y-3 mt-8">
        <h3 className="font-plusJakartaSans font-normal text-[13.89px]">
          Event Address
        </h3>

        {/* Street + Home Number Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg">
            <InputComponent
              placeholder="Street"
              value={form.street_address}
              onChange={(e) => {
                handleInputChange(e.target.value, "street_address");
              }}
              error={formErrors.street_address}
            />
          </div>
          <div>
            <InputComponent
              placeholder="Home Number"
              value={form.home_number}
              onChange={(e) => {
                handleInputChange(e.target.value, "home_number");
              }}
              error={formErrors.home_number}
            />
          </div>
        </div>

        {/* District + Postal Code Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <InputComponent
              placeholder="District"
              value={form.district}
              onChange={(e) => {
                handleInputChange(e.target.value, "district");
              }}
              error={formErrors.district}
            />
          </div>
          <div>
            <InputComponent
              placeholder="Postal / Zip code"
              value={form.postal_zip_code}
              onChange={(e) => {
                handleInputChange(e.target.value, "postal_zip_code");
              }}
              error={formErrors.postal_zip_code}
            />
          </div>
        </div>

        {/* State (Half Width) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <InputComponent
              placeholder="State"
              value={form.state}
              onChange={(e) => {
                handleInputChange(e.target.value, "state");
              }}
              error={formErrors.state}
            />

          </div>
          {/* Empty div to maintain grid alignment */}
          <div></div>
        </div>
      </div>

      {/* User Availability Check Section */}
      <div className="mt-8">
        <UserAvailabilityCheck
          onCheckAvailability={(isAvailable) => {
            handleUserAvailability(isAvailable);
          }}
          initialGuestCount={1} // Example: override initial guest count
          street_address={form.street_address}
          home_number={form.home_number}
          district={form.district}
          postal_zip_code={form.postal_zip_code}
          state={form.state}
        />

        <UsersAroundModal
          isOpen={isModalOpen}
          onClose={closeModal}
          isAvailable={isAvailable}
        />
        {/* <UserStatusModal
              isOpen={isModalOpen}
              onClose={closeModal}
            /> */}
      </div>

      <div className="mt-8">
        <label className="block font-plusJakartaSans font-normal text-[13.89px] mb-15">
          Age Range
        </label>
        <RadixAgeRangeSlider
          //label="Age range"
          min={18}
          max={100}
          initialValues={[18, 28]} // As shown in your image
          step={1}
          onValueChange={handleAgeRangeChange}
        />
      </div>
      <div>
        <div className="flex flex-row gap-3 mb-3 mt-6">
          <label className="font-plusJakartaSans font-normal text-[13.89px]">
            Number of Guests
          </label>
          <div onClick={handleGuestPriceModalOpen} className="mt-[-6px]">
            <InformationIcon />
          </div>
        </div>
        <GuestCounter
          initialGuests={Number(form.max_guests)} // Or any number between 0-99
          onAddToCart={handleGuestAddToCart}
          isSuccess={isAddedCartSuccess}
          setIsSuccess={setIsAddedCardSuccess}
          isInviteModalOpen={isInviteModalOpen}
          setIsInviteModalOpen={setIsInviteModalOpen}
        />
      </div>

      <div className="grid grid-cols-3 gap-x-3 mt-10">
        {" "}
        {/* Use grid-cols-3 */}
        {paymentOptionsConfig.map((option) => (
          <PaymentSelection
            key={option.id}
            id={option.id}
            mainLabel={option.mainLabel}
            valueText={option.valueText}
            name="paymentMethod" // Same name for the radio group
            value={option.value}
            checked={selectedPayment === option.value}
            onChange={handlePaymentChange}
            onValueChange={(val)=>{
              handleInputChange(val, "price");
            }}
            price={selectedPayment === option.value ? form.price : ""}
            isInput={option.isInput || false}
            isDisabled={selectedPayment === option.value ? false : true}
          />
        ))}
      </div>

      {/* Create Event Button */}
      <button
        onClick={() => {
          handlePreviewOpen();
        }}
        className="w-full mt-12 bg-app-button-primary  text-app-button-text-color py-3 px-4 rounded-lg transition-colors mb-50 "
      >
        Preview Event
      </button>
      <EventPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        eventDataObj={form}
        tempImgUrl={imagePreview}
        onEventCreate={() => {
          handleEventCreate();
        }}
      />
      <GuestPricesModal
        isOpen={isGuestPriceModalOpen}
        onClose={() => setIsGuestPriceModalOpen(false)}
      />
      <EventsTimeDetailsModal
        isOpen={isEventTimePriceModalOpen}
        onClose={() => setIsEventTimePriceModalOpen(false)}
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

export default CreateEventSection;
