"use client";

import InputComponent from "../../../components/InputComponent/InputComponent";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import {
  RightIcon,
  EventCategory1,
  EventCategory2,
  EventCategory3,
  EventCategory4,
  UploadImageIcon,
  BackToPageIcon,
  InformationIcon,
  OthersIcon,
  ArtsAndCraftIcon,
  CameraIcon,
  GardeningIcon,
  CampingIcon,
  HousePartyIcon,
  FoodIcon,
  CostumeIcon,
  TechIcon,
  FamilyActivityIcon,
  VideoGamesIcon,
  PetloveIcon,
  ActivismIcon,
  DYIIcon,
  ClubbingIcon,
  MusicIcon,
  KnightIcon,
  VanIcon,
  FestivalIcon,
  OutdoorsIcon,
  VolunteerIcon,
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
import { get_hobbies_list } from "@/routes/permissions_and_hobbies";
import InlineSvg from "@/components/InlineSVG/InlineSVG";
import { createEvent } from "@/routes/Events";
import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";

//event category data(need to move into utils file)-------------------
const EVENT_CATEGORIES = [
  { id: "spirituality", label: "Spirituality", icon: <EventCategory1 /> },
  { id: "movies", label: "Movies", icon: <EventCategory2 /> },
  { id: "sports", label: "Sports", icon: <EventCategory3 /> },
  { id: "pubs-bars", label: "Pubs & Bars", icon: <EventCategory4 /> },
  { id: "music", label: "Music", icon: <MusicIcon /> },
  { id: "foodie", label: "Foodie", icon: <FoodIcon /> },
  { id: "arts_and_craft", label: "Arts & Craft", icon: <ArtsAndCraftIcon /> },
  { id: "tech", label: "Tech", icon: <TechIcon /> },
  { id: "festival", label: "Festival", icon: <FestivalIcon /> },
  { id: "outdoors", label: "Outdoors", icon: <OutdoorsIcon /> },
  { id: "volunteer", label: "Volunteer", icon: <VolunteerIcon /> },
  { id: "activism", label: "Activism", icon: <ActivismIcon /> },
  { id: "pet_love", label: "Pet Love", icon: <PetloveIcon /> },
  { id: "video_games", label: "Video Games", icon: <VideoGamesIcon /> },
  {
    id: "family_activities",
    label: "Family Activities",
    icon: <FamilyActivityIcon />,
  },
  { id: "costume", label: "Costume", icon: <CostumeIcon /> },
  { id: "house_party", label: "House Party", icon: <HousePartyIcon /> },
  { id: "camping", label: "Camping", icon: <CampingIcon /> },
  { id: "gardening", label: "Gardening", icon: <GardeningIcon /> },
  { id: "photography", label: "Photography", icon: <CameraIcon /> },
  { id: "other", label: "Other", icon: <OthersIcon /> },
];

// Define the data for payment options directly in the parent
interface OptionConfig {
  id: string;
  mainLabel: string;
  valueText: string;
  value: string;
}

type EventCategoryProps = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

//payment option(need to move into utils file)
const paymentOptionsConfig: OptionConfig[] = [
  {
    id: "payment-free",
    mainLabel: "Free Event",
    valueText: "Free",
    value: "free",
  },
  {
    id: "payment-card",
    mainLabel: "Card Payment",
    valueText: "20$",
    value: "card_20",
  },
  {
    id: "payment-cash",
    mainLabel: "Cash On Entry",
    valueText: "50$",
    value: "cash_50",
  },
];

//main page function started--------------------------
const CreateEventSection = () => {
  // states
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<EventCategoryProps[]>([]);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // NEW
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoriesContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // State for event details
  const [eventName, setEventName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  // Selected duration for "event_start_in"
  const [eventStartIn, setEventStartIn] = useState<TimeOption>("24 Hrs");

  // Address fields
  const [street, setStreet] = useState<string>("");
  const [homeNumber, setHomeNumber] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [state, setState] = useState<string>("");

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
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 28]);
  const [guestCount, setGuestCount] = useState<number>(1); // NEW
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

  //load categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await get_hobbies_list();
      const mapped: EventCategoryProps[] = (res?.data ?? []).map(
        (item: any) => ({
          id: item.id,
          name: item.name,
          icon: (
            <InlineSvg
              svg={item.svg_code}
              //className="text-app-icon"
              title={item.name}
            />
          ),
        })
      );
      console.log(mapped, "catorgoris areee ");
      setCategories(mapped);
    } catch (error) {
      console.error("Error fetching interests:", error);
    } finally {
      setLoading(false);
    }
  };

  // -------------------- handlers --------------------

  //function for handle event start time
  const handleStartTimeChange = (newTime: string) => {
    console.log("Selected Time:", newTime);
    setSelectedStartTime(newTime);
  };

  console.log("gpm invide open", isInviteModalOpen);

  //function for handle event end time
  const handleEndTimeChange = (newTime: string) => {
    console.log("Selected Time:", newTime);
    setSelectedEndTime(newTime);
  };

  //modal open handle
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    if (isModalOpen === true) {
      setIsModalOpen(false);
    }
  };

  //maximum characters define for event description text area
  const maxCharacters = 1200;

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

  //Handlers for form inputs and interactions
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= maxCharacters) {
      setDescription(e.target.value);
    }
  };

  // Image upload handler
  const handleImageUpload = (file: any) => {
   // const file = e.target.files?.[0];

    if (!file) return;

    if (file) {
      
      console.log("file is this", file);
      setImageFile(file); // NEW
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (categoriesContainerRef.current?.offsetLeft || 0));
    setScrollLeft(categoriesContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !categoriesContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (categoriesContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    categoriesContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(
      e.touches[0].pageX - (categoriesContainerRef.current?.offsetLeft || 0)
    );
    setScrollLeft(categoriesContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !categoriesContainerRef.current) return;
    e.preventDefault();
    const x =
      e.touches[0].pageX - (categoriesContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    categoriesContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleUserAvailability = (guests: number) => {
    console.log(`Checking availability for ${guests} guests.`);
    openModal();
    // Add your API call or logic here
  };
  const handleAgeRangeChange = (values: [number, number]) => {
    console.log("Selected age range (Radix):", values);
    setAgeRange(values);
  };

  const handleGuestAddToCart = (guests: number) => {
    console.log(`Adding ${guests} guests to cart.`);
    setGuestCount(guests);
    setIsAddedCardSuccess(true);
    // Add your cart logic here
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedPayment(newValue);
    console.log("Selected Payment Method:", newValue);
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

  // --- helper: parse payment radio value -> API fields
  const parsePayment = (
    val: string
  ): { payment_type: string; price: number } => {
    console.log(val, "selected payment value");
    if (val === "free") return { payment_type: "free", price: 0 };
    if (val.startsWith("card_"))
      return { payment_type: "card", price: Number(val.split("_")[1] || 0) };
    if (val.startsWith("cash_"))
      return { payment_type: "cash", price: Number(val.split("_")[1] || 0) };
    return { payment_type: "free", price: 0 };
  };

  // --- CREATE EVENT submit

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }
    const { payment_type, price } = parsePayment(selectedPayment);
   // const form = new FormData();
    //const eventImage = form.append("event_image", imageFile, imageFile.name); // <-- key line
     const form = new FormData();
        //form.append("file", imageFile);
    // const payload = {
    //   user_id: "US00001",
    //   category_id: selectedCategory,

    //   destination: "events",
    //   event_image: imageFile,
    //   event_name: eventName,
    //   subtitle,
    //   description,
    //   event_start_in: eventStartIn || "",
    //   event_date: "2025-08-05",
    //   event_start_time: selectedStartTime,
    //   event_end_time: selectedEndTime || "",
    //   street_address: street,
    //   home_number: homeNumber,
    //   district,
    //   postal_zip_code: postalCode,
    //   state,
    //   age_range_min: ageRange[0],
    //   age_range_max: ageRange[1],
    //   max_guests: guestCount,
    //   payment_type,
    //   price,
    // };
     form.append("user_id", "US00009");
    form.append("category_id", selectedCategory ?? "");
    form.append(
      "destination",
      "events"
    );
    form.append("event_image", imageFile, imageFile.name); 

    form.append("event_name", eventName);
    form.append("subtitle", subtitle);
    form.append("description", description);
    form.append("event_start_in", eventStartIn || "");
    form.append("event_date", selectedDate || "");
    form.append("event_start_time", selectedStartTime || "");
    form.append("event_end_time", selectedEndTime || "");
    form.append("street_address", street);
    form.append("home_number", homeNumber);
    form.append("district", district);
    form.append("postal_zip_code", postalCode);
    form.append("state", state);
    form.append("age_range_min", String(ageRange[0]));
    form.append("age_range_max", String(ageRange[1]));
    form.append("max_guests", String(guestCount));
    form.append("payment_type", payment_type);
    form.append("price", String(price));
    //console.log(payload);
    try {
      setLoading(true);
      //setSaving(true);
      const res = await createEvent(form);
      console.log(res, "response is::::");
      alert(res?.message || "Event created!");
    } catch (error: any) {
      alert(error?.message || "Failed to create event.");
    } finally {
      setSaving(false);
      setLoading(false);
    }
  };

  const handleCreateEvents = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    const { payment_type, price } = parsePayment(selectedPayment);

    const form = new FormData();
    form.append("user_id", "US00009");
    form.append("category_id", selectedCategory ?? "");
    form.append(
      "destination",
      `${street} ${homeNumber}, ${district}, ${state} ${postalCode}`.trim()
    );
    form.append("event_image", imageFile, imageFile.name); // <-- key line

    form.append("event_name", eventName);
    form.append("subtitle", subtitle);
    form.append("description", description);
    form.append("event_start_in", eventStartIn || "");
    form.append("event_date", selectedDate || "");
    form.append("event_start_time", selectedStartTime || "");
    form.append("event_end_time", selectedEndTime || "");
    form.append("street_address", street);
    form.append("home_number", homeNumber);
    form.append("district", district);
    form.append("postal_zip_code", postalCode);
    form.append("state", state);
    form.append("age_range_min", String(ageRange[0]));
    form.append("age_range_max", String(ageRange[1]));
    form.append("max_guests", String(guestCount));
    form.append("payment_type", payment_type);
    form.append("price", String(price));

    try {
      setLoading(true);
      const res = await createEvent(form); // createEvent should POST body=form
      alert(res?.message || "Event created!");
    } catch (error: any) {
      alert(error?.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

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
        <label className="font-plusJakartaSans font-normal text-[13.89px]">
          Event Category
        </label>

        <div className="relative mt-3">
          <div className="overflow-hidden">
            <div
              ref={categoriesContainerRef}
              className="flex space-x-3 overflow-x-auto pb-3 -mx-4 px-4 no-scrollbar"
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                cursor: isDragging ? "grabbing" : "grab",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {categories.map((category) => (
                <div
                  className={`${
                    selectedCategory === category.id
                      ? "bg-k-secondary-color border-none"
                      : "bg-app-background-card hover:bg-app-background"
                  }bg-k-secondary-color border-none flex h-24 w-24 rounded-lg`}
                >
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`
            flex h-24 w-24 flex-col items-center justify-center rounded-lg p-2 text-center transition-all duration-200
            ${
              selectedCategory === category.id
                ? "bg-k-secondary-color border-none"
                : "bg-app-background-card hover:bg-app-background"
            }
          `}
                  >
                    <div
                      className={`${
                        selectedCategory === category.id && isDark
                          ? "text-gray-900"
                          : ""
                      } mb-1 text-xl`}
                    >
                      {category.icon}
                    </div>

                    <span
                      className={`font-plusJakartaSans font-medium text-[8.39px] ${
                        selectedCategory === category.id && isDark
                          ? "text-black"
                          : "text"
                      } leading-tight`}
                    >
                      {category.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Image Section */}
      <div className="mb-6">
        <label className="block font-plusJakartaSans font-normal text-[13.89px] mb-2">
          Event Image
        </label>
        <p className="text-text-sub-caption mb-3 font-plusJakartaSans font-normal text-[11.29px] text-gray-500">
          (Recommended size 400*400px)
        </p>

        <div
          onClick={triggerFileInput}
          className="border-2 border-dashed border-gray-500 rounded-lg p-5 text-center cursor-pointer transition-colors"
        >
          {imagePreview ? (
            <div className="relative w-full h-40 rounded-md overflow-hidden">
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
            //onChange={handleImageUpload}
              onChange={(e: any) => {
                      handleImageUpload(
                        e.target.files[0],
                       
                      );
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
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block font-plusJakartaSans font-normal text-[13.89px] mb-3">
            Subtitle
          </label>
          <InputComponent
            placeholder="Add a subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-plusJakartaSans font-normal text-[13.89px] mb-3">
            Description
          </label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            maxLength={maxCharacters}
            placeholder="More About the event"
            className="w-full h-32 p-3 bg-app-input-primary  rounded-lg text-sm focus:ring-1 focus:ring-yellow-400 placeholder-gray-500 resize-none"
          />
          <p className="font-plusJakartaSans font-normal text-[10px] text-app-text-secondary mt-1 text-right">
            {description.length}/{maxCharacters} Max
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

      <div className="mt-8 ">
        <DatePicker
          label="Date"
          isOpen={isDatePickerOpen}
          setIsOpen={handleSetDatePickerOpen}
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
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div>
            <InputComponent
              placeholder="Home Number"
              value={homeNumber}
              onChange={(e) => setHomeNumber(e.target.value)}
            />
          </div>
        </div>

        {/* District + Postal Code Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <InputComponent
              placeholder="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </div>
          <div>
            <InputComponent
              placeholder="Postal / Zip code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>

        {/* State (Half Width) */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <InputComponent
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          {/* Empty div to maintain grid alignment */}
          <div></div>
        </div>
      </div>

      {/* User Availability Check Section */}
      <div className="mt-8">
        <UserAvailabilityCheck
          onCheckAvailability={handleUserAvailability}
          initialGuestCount={50} // Example: override initial guest count
        />

        <UsersAroundModal isOpen={isModalOpen} onClose={closeModal} />
        {/* <UserStatusModal 
              isOpen={isModalOpen} 
              onClose={closeModal} 
            /> */}
      </div>

      <div className="mt-8">
        <label className="block font-plusJakartaSans font-normal text-[13.89px] mb-15">
          Age Range
        </label>
        {/* Age Range Slider Section using Radix UI */}
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
          initialGuests={1} // Or any number between 0-99
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
          />
        ))}
      </div>

      {/* Create Event Button */}
      <button
        //onClick={() => setIsPreviewOpen(true)}
        onClick={handleCreateEvent}
        className="w-full mt-12 bg-app-button-primary  text-app-button-text-color py-3 px-4 rounded-lg transition-colors mb-50 "
      >
        Preview Event
      </button>
      <EventPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
      <GuestPricesModal
        isOpen={isGuestPriceModalOpen}
        onClose={() => setIsGuestPriceModalOpen(false)}
      />
      <EventsTimeDetailsModal
        isOpen={isEventTimePriceModalOpen}
        onClose={() => setIsEventTimePriceModalOpen(false)}
      />
    </div>
  );
};

export default CreateEventSection;
