"use client";

import InputComponent from "../../../../components/InputComponent/InputComponent";
import React, { useState, useRef } from "react";
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
} from "../../../../../public/svg-icons/icons";
import TimeDurationSelector from "@/components/TimeDurationSelector/TimeDurationSelector";
//import DatePicker from "@/components/DatePicker/DatePicker";
import DatePicker from "@/components/DatePicker/DatePickerUpdate";
import TimePicker from "@/components/TimePicker/TimePicker";
import UserAvailabilityCheck from "@/components/EventUserAvailabilityCheck/UserAvailabilityCheck";
import RadixAgeRangeSlider from "@/components/AgeRangeSlider/AgeRangeSlider";
import GuestCounter from "./GuestCounter/GuestCounter";
import PaymentSelection from "./PaymentSelection/PaymentSelection";
import UsersAroundModal from "./UserAvailabilityModal/UserAvailabilityModal";

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

const CreateEventSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categoriesContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // State for event details
  const [eventName, setEventName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

  // Address fields
  const [street, setStreet] = useState<string>("");
  const [homeNumber, setHomeNumber] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [state, setState] = useState<string>("");

  //set modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isDatePickerOpen, setDatePickerOpen] = useState(false);

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    if (isModalOpen === true) {
      setIsModalOpen(false);
    }
  };

  const maxCharacters = 1200; // Set your max character limit

  //payment selection state
  const [selectedPayment, setSelectedPayment] = useState<string>("free");

  //Handlers for form inputs and interactions
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= maxCharacters) {
      setDescription(e.target.value);
    }
  };

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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

  // Mobile-like drag scrolling handlers
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

  // Handlers for date and time pickers
  const handleDateClick = () => {
    console.log("Date display clicked! Open calendar here.");
    // In a real app, you'd set state to show a calendar modal/popup
  };

  const handleStartTimeClick = () => {
    console.log("Start time display clicked! Open time picker here.");
  };

  const handleEndTimeClick = () => {
    console.log("End time display clicked! Open time picker here.");
  };

  // Handlers for user availability check, age range, guest counter, and payment selection

  const handleUserAvailability = (guests: number) => {
    console.log(`Checking availability for ${guests} guests.`);
    openModal();
    // Add your API call or logic here
  };
  const handleAgeRangeChange = (values: [number, number]) => {
    console.log("Selected age range (Radix):", values);
  };

  const handleGuestAddToCart = (guests: number) => {
    console.log(`Adding ${guests} guests to cart.`);
    // Add your cart logic here
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSelectedPayment(newValue);
    console.log("Selected Payment Method:", newValue);
    // Update your form state or perform actions based on the selection
  };

  return (
    <div
      className={`max-w-full mx-auto p-6 ${
        isDatePickerOpen && isDark
          ? "bg-neutral-900"
          : isDatePickerOpen && !isDark
          ? "bg-gray-200"
          : "bg-app-background-primary"
      }   rounded-lg`}
      onClick={closeModal}
    >
      <div className="flex flex-row gap-5">
        <div className="">
          <BackToPageIcon />
        </div>

        <h2 className="text-heading mb-6">Create event</h2>
      </div>

      {/* Event Category Section */}
      <div className="mb-6">
        <label className="text-body">Event Category</label>

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
              {EVENT_CATEGORIES.map((category) => (
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
                    <div className="mb-1 text-xl">{category.icon}</div>
                    <span className="text-sm font-medium leading-tight text-text-title">
                      {category.label}
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
        <label className="block text-body mb-2">Event Image</label>
        <p className="text-text-sub-caption mb-3 text-[14px] text-gray-500">
          (Recommended size 400*400px)
        </p>

        <div
          onClick={triggerFileInput}
          className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center cursor-pointer transition-colors"
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

              <p className="text-text-sub-caption text-gray-500">
                Upload an image
              </p>
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
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
          <span className="text-sub-texts">PayPal Connected</span>
          <div className="flex bg-gray-100 ml-3 p-2 rounded-md">
            <RightIcon />
          </div>
        </div>
      </div>

      <div className="space-y-6 mt-6">
        {/* Event Name */}
        <div>
          <label className="block text-body mb-3">Event Name</label>
          <InputComponent
            placeholder="Add a title"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-body mb-3">Subtitle</label>
          <InputComponent
            placeholder="Add a subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-body mb-3">Description</label>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            maxLength={maxCharacters}
            placeholder="More About the event"
            className="w-full h-32 p-3 bg-app-input-primary  rounded-lg text-sm focus:ring-1 focus:ring-yellow-400 placeholder-gray-500"
          />
          <p className="text-xs text-app-text-secondary mt-1 text-right">
            {description.length}/{maxCharacters} Max
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-row gap-3 mb-3 mt-6">
          <label className="block text-body mb-1">Event starts in</label>
          <div className="mt-[-6px]">
            <InformationIcon />
          </div>
        </div>
        <TimeDurationSelector />
      </div>

      <div className="mt-8 ">
        <DatePicker
          label="Date"
          isOpen={isDatePickerOpen}
          setIsOpen={setDatePickerOpen}

          //currentDateDisplay="Tuesday, 25th June, 2024"
          //onClick={handleDateClick}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-8">
        <TimePicker
          label="Event Start time"
          currentTimeDisplay="08:30 PM"
          onClick={handleStartTimeClick}
        />
        <TimePicker
          label="Event End time"
          currentTimeDisplay="08:30 PM"
          onClick={handleEndTimeClick}
        />
      </div>
      <div className="space-y-3 mt-8">
        <h3 className="text-body">Event Address</h3>

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
      </div>
      <UsersAroundModal isOpen={isModalOpen} onClose={() => {}} />
      <div className="mt-8">
        <label className="block text-body mb-15">Age Range</label>
        {/* Age Range Slider Section using Radix UI */}
        <RadixAgeRangeSlider
          //label="Age range"
          min={0}
          max={100}
          initialValues={[18, 28]} // As shown in your image
          step={1}
          onValueChange={handleAgeRangeChange}
        />
      </div>
      <div>
        <div className="flex flex-row gap-3 mb-3 mt-6">
          <label className="text-body">Number of Guests</label>
          <div className="mt-[-6px]">
            <InformationIcon />
          </div>
        </div>
        <GuestCounter
          initialGuests={1} // Or any number between 0-99
          onAddToCart={handleGuestAddToCart}
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
      <button className="w-full mt-10 bg-app-button-primary  text-app-button-text-color py-3 px-4 rounded-lg transition-colors mb-10">
        Preview Event
      </button>
    </div>
  );
};

export default CreateEventSection;
