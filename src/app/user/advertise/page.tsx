"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useEffect, useRef, useState } from "react";
import InputComponent from "@/components/InputComponent/InputComponent";
import {
  InformationIcon,
  OkayGreenIcon,
  OkayIcon,
  UploadImageIcon,
} from "../../../../public/svg-icons/icons";
import DropDown from "@/components/DropDown/DropDown";
import TextAreaComponent from "@/components/TextAreaComponent/TextAreaComponent";
import RadioButtonGroupComponent from "@/components/RadioButtonGroupComponent/RadioButtonGroupComponent";
import ImageUploadComponent from "@/components/ImageUploadComponent/ImageUploadComponent";
import RadixAgeRangeSlider from "@/components/AgeRangeSlider/AgeRangeSlider";
import PreviewAdvertise from "./models/PreviewModal";
import CheckMarkGif from "@/components/GifComponents/CheckMarkGif/CheckMarkGif";
import AdvertModel from "./models/AdvertModel";
import VerticalHobbyScroller from "@/components/VerticalHobbyScroller/VerticalHobbyScroller";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import {
  create_advert,
  get_advert_saved_list,
  get_all_advert_daily_budget_types,
  get_all_advert_languages,
  get_all_advert_regions,
  get_all_call_to_actions,
  upload_advert_image,
} from "@/routes/advert";
import Image from "next/image";

// types
type ChooseInterestsProps = {
  id: number;
  name: string;
  icon: string;
};

type AdvertProps = {
  category_id: string;
  advert_image_type: string;
  advert_image_url_1: File | string;
  advert_image_url_2?: File | string;
  advert_image_url_3?: File | string;
  call_to_action: string;
  call_to_action_link: string;
  second_call_to_action: string;
  second_call_to_action_link: string;
  campaign_name: string;
  title: string;
  description: string;
  audience_min_age: number;
  audience_max_age: number;
  gender: string[];
  region: string;
  advert_location: string[];
  language: string;
  advert_placement: string;
  platform: string[];
  daily_budget_type: string;
  daily_budget: number;
  advert_duration: number;
  save_template?: boolean;
};

type SavedAdvertList = {
  label: string;
  value: string;
};

type MetaDataProps = {
  label: string;
  value: string;
};

const page = () => {
  //   loading state
  const [loading, setLoading] = useState(false);

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [confirm, setConfirm] = useState(true);
  const [isCreateAdvertModelOpen, setIsCreateAdvertModelOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateAdvert, setIsCreateAdvert] = useState(false);

  // STATES FOR RADIO BUTTONS----------//
  const [selectedGender, setSelectedGender] = useState("male");
  const [deviceType, setDeviceType] = useState("ios");
  const [budget, setBudget] = useState("1$");
  const [advertPlacement, setAdvertPlacement] = useState(
    "General advert Placement Pricing"
  );
  const [addType, setAddType] = useState("static_ads");

  // states for meta data
  const [savedAdvertList, setSavedAdvertList] = useState<SavedAdvertList[]>([]);
  const [advertRegions, setAdvertRegions] = useState<MetaDataProps[]>([]);
  const [advertLanguages, setAdvertLanguages] = useState<MetaDataProps[]>([]);
  const [advertDailyBudgets, setAdvertDailyBudgets] = useState<MetaDataProps[]>(
    []
  );
  const [callToActions, setCallToActions] = useState<MetaDataProps[]>([]);

  // tempAdvertLocation
  const [tempAdvertLocation, setTempAdvertLocation] = useState<string>("");

  // temp  state for advert image urls
  const [staticAdvertImage, setStaticAdvertImage] = useState<string | null>(
    null
  );
  const [carouselAdvertImage1, setCarouselAdvertImage1] = useState<
    string | null
  >(null);
  const [carouselAdvertImage2, setCarouselAdvertImage2] = useState<
    string | null
  >(null);
  const [carouselAdvertImage3, setCarouselAdvertImage3] = useState<
    string | null
  >(null);

  // form data state
  const [form, setForm] = useState<AdvertProps>({
    category_id: "",
    advert_image_type: "static",
    advert_image_url_1: "",
    advert_image_url_2: "",
    advert_image_url_3: "",
    call_to_action: "",
    call_to_action_link: "",
    second_call_to_action: "",
    second_call_to_action_link: "",
    campaign_name: "",
    title: "",
    description: "",
    audience_min_age: 18,
    audience_max_age: 28,
    gender: [],
    region: "",
    advert_location: [],
    language: "",
    advert_placement: "",
    platform: [],
    daily_budget_type: "",
    daily_budget: 0,
    advert_duration: 0,
    save_template: false,
  });

  // first get saved advert list
  useEffect(() => {
    fetchSavedAdvertByUser();
    // get functions for metadata
    fetchCallToActions();
    fetchAdvertRegions();
    fetchAdvertLanguages();
    fetchAdvertDailyBudgets();
  }, []);

  const fetchSavedAdvertByUser = async () => {
    setLoading(true);
    try {
      const data = await get_advert_saved_list();

      if (data.success) {
        setSavedAdvertList(data.data);
      }
    } catch (error) {
      setError("An error occurred");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    } finally {
      setLoading(false);
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const triggerFileInput = () => {
    if (form.advert_image_type !== "static") {
      setError("Select Static Ads option to upload static images");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    }
    fileInputRef.current?.click();
  };

  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const triggerFileInput2 = () => {
    if (form.advert_image_type !== "carousel") {
      setError("Select Carousel Ads option to upload carousel images");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    }
    if (carouselAdvertImage1 && carouselAdvertImage2 && carouselAdvertImage3) {
      setError("You can only upload up to 3 images for carousel ads");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    }
    fileInputRef2.current?.click();
  };

  // ========== get advert meta data
  // get advert call to actions
  const fetchCallToActions = async () => {
    setLoading(true);
    try {
      const data = await get_all_call_to_actions();

      if (data.success) {
        setCallToActions(data.data);
      }
    } catch (error) {
      setError("An error occurred");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    } finally {
      setLoading(false);
    }
  };
  // get advert regions
  const fetchAdvertRegions = async () => {
    setLoading(true);
    try {
      const data = await get_all_advert_regions();

      if (data.success) {
        setAdvertRegions(data.data);
      }
    } catch (error) {
      setError("An error occurred");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    } finally {
      setLoading(false);
    }
  };
  // get advert languages
  const fetchAdvertLanguages = async () => {
    setLoading(true);
    try {
      const data = await get_all_advert_languages();

      if (data.success) {
        setAdvertLanguages(data.data);
      }
    } catch (error) {
      setError("An error occurred");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    } finally {
      setLoading(false);
    }
  };
  // get advert daily budgets
  const fetchAdvertDailyBudgets = async () => {
    setLoading(true);
    try {
      const data = await get_all_advert_daily_budget_types();

      if (data.success) {
        setAdvertDailyBudgets(data.data);
      }
    } catch (error) {
      setError("An error occurred");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return;
    } finally {
      setLoading(false);
    }
  };

  // -------- handlePreview
  const handlePreview = async () => {
    if (!validateForm()) {
      return;
    }
  };

  // -------- handleChange for input fields ---------
  const handleInputChange = (
    value: File | string | number | boolean | string[],
    name: string
  ) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // form validation for required fields
    if (!form.category_id) {
      setError("Please select a category");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (!form.call_to_action) {
      setError("Please select a call to action");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (!form.campaign_name) {
      setError("Please enter a campaign name");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (!form.title) {
      setError("Please enter a title");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (!form.description) {
      setError("Please enter a description");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (!form.audience_min_age || !form.audience_max_age) {
      setError("Please enter a valid audience age");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (form.gender.length === 0) {
      setError("Please select a gender");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (!form.region) {
      setError("Please select a region");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (form.advert_location.length === 0) {
      setError("Please select an advert location");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (!form.language) {
      setError("Please select a language");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (!form.advert_placement) {
      setError("Please select an advert placement");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (form.platform.length === 0) {
      setError("Please select a platform");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (!form.daily_budget_type) {
      setError("Please select a daily budget type");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (!form.daily_budget || form.daily_budget <= 0) {
      setError("Please enter a valid daily budget");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (!form.advert_duration || form.advert_duration <= 0) {
      setError("Please enter a valid advert duration");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    }

    if (form.advert_image_type === "static" && !staticAdvertImage) {
      setError("Please upload a static advert image");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    } else if (
      form.advert_image_type === "carousel" &&
      (!carouselAdvertImage1 || !carouselAdvertImage2 || !carouselAdvertImage3)
    ) {
      setError("Please upload all images for carousel ads");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
      return false;
    }
    return true;
  };

  // submit application
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    if (loading) return;
    try {
      setLoading(true);

      // set advert_image_urls
      if (form.advert_image_type === "static" && form.advert_image_url_1) {
        const formData = new FormData();
        formData.append("destination", "advert");
        formData.append("advert_image", form.advert_image_url_1);

        const data = await upload_advert_image(formData);
        if (data.success) {
          form.advert_image_url_1 = data.advert_img_url;
        } else {
          setError("Image upload failed, please try again");
          setShowErrorModel(true);
          setTimeout(() => setShowErrorModel(false), 3600);
          return;
        }
      } else if (form.advert_image_type === "carousel") {
        if (form.advert_image_url_1) {
          const formData = new FormData();
          formData.append("destination", "advert");
          formData.append("advert_image", form.advert_image_url_1);
          const data = await upload_advert_image(formData);
          if (data.success) {
          form.advert_image_url_1 = data.advert_img_url;
          } else {
            setError("Image upload failed, please try again");
            setShowErrorModel(true);
            setTimeout(() => setShowErrorModel(false), 3600);
            return;
          }
        }
        if (form.advert_image_url_2) {
          const formData = new FormData();
          formData.append("destination", "advert");
          formData.append("advert_image", form.advert_image_url_2);
          const data = await upload_advert_image(formData);
          if (data.success) {
            form.advert_image_url_2 = data.advert_img_url;
          } else {
            setError("Image upload failed, please try again");
            setShowErrorModel(true);
            setTimeout(() => setShowErrorModel(false), 3600);
            return;
          }
        }
        if (form.advert_image_url_3) {
          const formData = new FormData();
          formData.append("destination", "advert");
          formData.append("advert_image", form.advert_image_url_3);
          const data = await upload_advert_image(formData);
          if (data.success) {
            form.advert_image_url_3 = data.advert_img_url;
          } else {
            setError("Image upload failed, please try again");
            setShowErrorModel(true);
            setTimeout(() => setShowErrorModel(false), 3600);
            return;
          }
        }
      }
      // set form data
      let data = await create_advert(form);
      if (data.success) {
        setSuccess("Your advert has been created successfully.");
        setShowSuccessModel(true);
        setTimeout(() => setShowSuccessModel(false), 3600);
        // reset form
        setForm({
          category_id: "",
          advert_image_type: "static",
          advert_image_url_1: "",
          advert_image_url_2: "",
          advert_image_url_3: "",
          call_to_action: "",
          call_to_action_link: "",
          second_call_to_action: "",
          second_call_to_action_link: "",
          campaign_name: "",
          title: "",
          description: "",
          audience_min_age: 18,
          audience_max_age: 28,
          gender: [],
          region: "",
          advert_location: [],
          language: "",
          advert_placement: "",
          platform: [],
          daily_budget_type: "",
          daily_budget: 0,
          advert_duration: 0,
          save_template: false,
        });
      } else {
        setError(data.message || "An error occurred, please try again.");
        setShowErrorModel(true);
        setTimeout(() => setShowErrorModel(false), 3600);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`overflow-y-auto max-h-screen no-scrollbar ${
        isDropdownOpen ||
        isCreateAdvert ||
        isModalOpen ||
        isCreateAdvertModelOpen
          ? "bg-k-background-secondary"
          : "bg-k-background-primary"
      } `}
    >
      <div className={`min-h-screen flex flex-col`}>
        <div className={`w-full max-w-md px-4 top-0 left-0 right-0 `}>
          {/* Header */}
          <header
            className={`fixed w-full pt-[64px] flex items-center mb-10 z-1000 ${
              isDropdownOpen ||
              isCreateAdvert ||
              isModalOpen ||
              isCreateAdvertModelOpen
                ? "bg-k-background-secondary"
                : "bg-k-background-primary"
            } `}
          >
            <h1 className="mt-4 text-[23px] font-bold text-app-text-primary font-plusJakartaSans">
              Create advert
            </h1>
          </header>
        </div>
        {/* body section */}

        <div className="space-y-1 mt-[130px] px-6 mb-40">
          <div>
            {" "}
            <p className="mb-1 text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
              Saved Campaign
            </p>
            <div className="flex items-center gap-2 justify-between">
              <div className="w-full">
                <DropDown
                  dataArray={savedAdvertList}
                  placeHolder="Special Offer"
                  isOpen={() => setIsDropdownOpen(!isDropdownOpen)}
                />
              </div>
              <div
                className="bg-app-okay-icon-filter rounded-lg p-2 h-1/2"
                onClick={() => {
                  setConfirm(!confirm);
                }}
              >
                {confirm ? (
                  <OkayIcon className="text-app-icon " />
                ) : (
                  <OkayGreenIcon />
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-1 text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
                Campaign Name
              </p>
              <div className="space-y-4 mb-[24px]">
                <div className="relative">
                  <InputComponent
                    placeholder="New Campaign"
                    required
                    value={form.campaign_name}
                    onChange={(e) => {
                      handleInputChange(e.target.value, "campaign_name");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="font-plusJakartaSans font-normal text-[12.97px] text-app-text-primary mb-3">
              Advert Category
            </p>

            <VerticalHobbyScroller
              selectedValue={form.category_id}
              onChange={(value: ChooseInterestsProps) => {
                handleInputChange(value.id, "category_id");
              }}
            />
          </div>
          <div className="mb-[10px]">
            <p className="text-app-text-primary font-plusJakartaSans font-normal text-[12.97px]">
              Advert Image
            </p>
            <p className="text-app-text-secondary font-plusJakartaSans font-normal text-[10.54px] mb-[10px]">
              (Recommended size 400*400px)
            </p>
          </div>

          {/* ============= Static Ads ============= */}
          <div className="mb-5">
            <div className="mb-5">
              <RadioButtonGroupComponent
                value={form.advert_image_type}
                onChange={(value) => {
                  handleInputChange(value, "advert_image_type");
                  setCarouselAdvertImage1(null);
                  setCarouselAdvertImage2(null);
                  setCarouselAdvertImage3(null);
                }}
                name=""
                options={[{ id: 1, label: "Static Ads", value: "static" }]}
              />
            </div>
            <div
              onClick={triggerFileInput}
              className={`${
                !staticAdvertImage
                  ? "border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-5 text-center cursor-pointer transition-colors"
                  : ""
              } `}
            >
              {staticAdvertImage ? (
                <div className="relative w-full h-40 rounded-md overflow-hidden">
                  <Image
                    src={staticAdvertImage}
                    alt="Event preview"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
              ) : (
                <>
                  <div className="mx-auto h-[19.46px] w-[19.46px] text-gray-400">
                    <UploadImageIcon />
                  </div>

                  <p className="font-plusJakartaSans font-normal text-[10.54px] text-gray-500 mt-2">
                    Upload an image
                  </p>
                </>
              )}
              <input
                type="file"
                ref={fileInputRef}
                disabled={form.advert_image_type !== "static"}
                onChange={(e: any) => {
                  setStaticAdvertImage(URL.createObjectURL(e.target.files[0]));
                  handleInputChange(e.target.files[0], "advert_image_url_1");
                }}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
          {/* ============= Carousel Ads ============= */}
          <div className="mb-5">
            <div className="mb-5">
              <RadioButtonGroupComponent
                value={form.advert_image_type}
                onChange={(value) => {
                  handleInputChange(value, "advert_image_type");
                  setStaticAdvertImage(null);
                }}
                name=""
                options={[{ id: 1, label: "Carousel Ads", value: "carousel" }]}
              />
            </div>
            <div
              onClick={triggerFileInput2}
              className={`border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-5 text-center cursor-pointer transition-colors
                  `}
            >
              <>
                <div className="mx-auto h-[19.46px] w-[19.46px] text-gray-400">
                  <UploadImageIcon />
                </div>

                <p className="font-plusJakartaSans font-normal text-[10.54px] text-gray-500 mt-2">
                  Upload an image
                </p>
              </>
              <input
                type="file"
                ref={fileInputRef2}
                disabled={form.advert_image_type !== "carousel"}
                onChange={(e: any) => {
                  if (carouselAdvertImage1 === null) {
                    setCarouselAdvertImage1(
                      URL.createObjectURL(e.target.files[0])
                    );
                    handleInputChange(e.target.files[0], "advert_image_url_1");
                  } else if (carouselAdvertImage2 === null) {
                    setCarouselAdvertImage2(
                      URL.createObjectURL(e.target.files[0])
                    );
                    handleInputChange(e.target.files[0], "advert_image_url_2");
                  } else if (carouselAdvertImage3 === null) {
                    setCarouselAdvertImage3(
                      URL.createObjectURL(e.target.files[0])
                    );
                    handleInputChange(e.target.files[0], "advert_image_url_3");
                  }
                }}
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="flex items-center justify-between gap-1.5 mt-4">
              <div
                className={`${
                  !carouselAdvertImage1
                    ? "border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-5 text-center cursor-pointer transition-colors"
                    : ""
                } `}
              >
                {carouselAdvertImage1 ? (
                  <div className="relative w-auto h-auto rounded-md overflow-hidden">
                    <Image
                      src={carouselAdvertImage1}
                      alt="Image preview"
                      width={100}
                      height={100}
                    />
                  </div>
                ) : (
                  <>
                    <div className="mx-auto h-[19.46px] w-[19.46px] text-gray-400">
                      <UploadImageIcon />
                    </div>

                    <p className="font-plusJakartaSans font-normal text-[10.54px] text-gray-500 mt-2">
                      Upload an image
                    </p>
                  </>
                )}
              </div>
              <div
                className={`${
                  !carouselAdvertImage2
                    ? "border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-5 text-center cursor-pointer transition-colors"
                    : ""
                } `}
              >
                {carouselAdvertImage2 ? (
                  <div className="relative w-auto h-auto rounded-md overflow-hidden">
                    <Image
                      src={carouselAdvertImage2}
                      alt="Image preview"
                      width={100}
                      height={100}
                      // layout="fill"
                      // objectFit="cover"
                      // className="rounded-md"
                    />
                  </div>
                ) : (
                  <>
                    <div className="mx-auto h-[19.46px] w-[19.46px] text-gray-400">
                      <UploadImageIcon />
                    </div>

                    <p className="font-plusJakartaSans font-normal text-[10.54px] text-gray-500 mt-2">
                      Upload an image
                    </p>
                  </>
                )}
              </div>
              <div
                className={`${
                  !carouselAdvertImage3
                    ? "border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-5 text-center cursor-pointer transition-colors"
                    : ""
                } `}
              >
                {carouselAdvertImage3 ? (
                  <div className="relative w-auto h-auto rounded-md overflow-hidden">
                    <Image
                      src={carouselAdvertImage3}
                      alt="Image preview"
                      width={100}
                      height={100}
                      // layout="fill"
                      // objectFit="cover"
                      // className="rounded-md"
                    />
                  </div>
                ) : (
                  <>
                    <div className="mx-auto h-[19.46px] w-[19.46px] text-gray-400">
                      <UploadImageIcon />
                    </div>

                    <p className="font-plusJakartaSans font-normal text-[10.54px] text-gray-500 mt-2">
                      Upload an image
                    </p>
                  </>
                )}
              </div>
              {/* <ImageUploadComponent
                isDisabled={true}
                value={
                  carouselAdvertImage1
                    ? URL.createObjectURL(carouselAdvertImage1)
                    : ""
                }
              /> */}
              {/* <ImageUploadComponent
                isDisabled={true}
                value={
                  carouselAdvertImage2
                    ? URL.createObjectURL(carouselAdvertImage2)
                    : ""
                }
              />
              <ImageUploadComponent
                isDisabled={true}
                value={
                  carouselAdvertImage3
                    ? URL.createObjectURL(carouselAdvertImage3)
                    : ""
                }
              /> */}
            </div>
          </div>
          <div className="mt-10">
            <p className="mb-1 text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
              Call to Action
            </p>
            <DropDown
              dataArray={callToActions}
              placeHolder="select"
              isOpen={() => setIsDropdownOpen(!isDropdownOpen)}
              onChange={(value: string) => {
                handleInputChange(value, "call_to_action");
              }}
            />
          </div>
          <div className="mt-4">
            <p className="font-plusJakartaSans font-normal text-[13.89px] mb-1 text-app-text-primary ">
              Call to Action link
            </p>
            <div className="space-y-4 mb-[24px]">
              <div className="relative">
                <InputComponent
                  placeholder="Enter link"
                  value={form.call_to_action_link}
                  onChange={(e) => {
                    handleInputChange(e.target.value, "call_to_action_link");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-1 text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
              2nd Call to Action Text
            </p>
            <div className="space-y-4 mb-[24px]">
              <div className="relative">
                <InputComponent
                  placeholder="Enter text"
                  value={form.second_call_to_action}
                  onChange={(e) => {
                    handleInputChange(e.target.value, "second_call_to_action");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-1 text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
              2nd Call to Action Link
            </p>
            <div className="space-y-4 mb-[24px]">
              <div className="relative">
                <InputComponent
                  placeholder="Enter link"
                  value={form.second_call_to_action_link}
                  onChange={(e) => {
                    handleInputChange(
                      e.target.value,
                      "second_call_to_action_link"
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="mt-4">
              <p className="mb-1 text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
                Title
              </p>
              <div className="space-y-4 mb-[24px]">
                <div className="relative">
                  <InputComponent
                    placeholder="Add a title"
                    value={form.title}
                    onChange={(e) => {
                      handleInputChange(e.target.value, "title");
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-1 text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
                Description
              </p>
              <div className="space-y-4">
                <div className="relative">
                  <TextAreaComponent
                    placeholder="More about the event"
                    value={form.description}
                    onChange={(e) =>
                      handleInputChange(e.target.value, "description")
                    }
                  />
                </div>
              </div>
              <p className="text-[10.59px] text-end mb-1 text-app-text-secondary font-plusJakartaSans-400">
                {form.description.length}/1200 Max
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p className="mb-1 text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
              Audience Insight
            </p>
            <div className="mt-2 border-[1.6px] rounded-xl border-app-border-advert px-8 py-6">
              <div className="mb-5">
                <div className="">
                  <label className="block font-plusJakartaSans font-normal text-[13.45px] mb-[54px]">
                    Age range
                  </label>
                  {/* Age Range Slider Section using Radix UI */}
                  <RadixAgeRangeSlider
                    //label="Age range"
                    min={0}
                    max={100}
                    initialValues={[18, 28]} // As shown in your image
                    step={1}
                    onValueChange={(values: [number, number]) => {
                      handleInputChange(values[0], "audience_min_age");
                      handleInputChange(values[1], "audience_max_age");
                    }}
                  />
                </div>
                <p className="mb-2 text-app-text-primary font-plusJakartaSans font-normal text-[13.45px]">
                  Gender
                </p>
                <RadioButtonGroupComponent
                  onChange={(value) => {
                    handleInputChange(value, "gender");
                  }}
                  value={form.gender}
                  name=""
                  options={[
                    { id: 1, label: "Male", value: "male" },
                    { id: 2, label: "Female", value: "female" },
                    { id: 3, label: "Other", value: "other" },
                  ]}
                  isMultiSelect
                />
                <div className="mt-4">
                  <p className="mb-1 text-app-text-primary font-plusJakartaSans font-normal text-[13.45px]">
                    Region
                  </p>
                  <DropDown
                    dataArray={advertRegions}
                    placeHolder="Europe"
                    isOpen={() => setIsDropdownOpen(!isDropdownOpen)}
                    onChange={(value: string) => {
                      handleInputChange(value, "region");
                    }}
                  />
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex items-center gap-1">
                    <p className="text-app-text-primary font-plusJakartaSans font-normal text-[13.45px]">
                      Advert Location
                    </p>
                  </div>
                  <div className="space-y-4 mb-1">
                    <div className="relative">
                      <InputComponent
                        placeholder="Enter Country, State or Town"
                        value={tempAdvertLocation}
                        onChange={(e) => {
                          setTempAdvertLocation(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <p
                    style={{ color: "#004DFF" }}
                    className="font-plusJakartaSans font-normal text-[10px]"
                  >
                    Maximum 3 locations per advert
                  </p>
                </div>
                <div className="pt-4">
                  <button
                    className="w-full bg-app-button-primary font-plusJakartaSans font-normal text-[16px] text-app-text-tertiary py-3 px-4 rounded-lg"
                    onClick={() => {
                      if (tempAdvertLocation === "") {
                        setError("Please enter a location");
                        setShowErrorModel(true);
                        setTimeout(() => setShowErrorModel(false), 3600);
                        return;
                      } else if (form.advert_location.length === 3) {
                        setError("Maximum 3 locations allowed");
                        setTempAdvertLocation("");
                        setShowErrorModel(true);
                        setTimeout(() => setShowErrorModel(false), 3600);
                        return;
                      } else {
                        const updatedLocations = [
                          ...form.advert_location,
                          tempAdvertLocation,
                        ];
                        handleInputChange(updatedLocations, "advert_location");
                        setTempAdvertLocation("");
                      }
                    }}
                  >
                    Add
                  </button>
                  <div className="flex items-center gap-[24px] mt-1">
                    {/* map through advert location */}
                    {form.advert_location.map((location, index) => (
                      <p
                        key={index}
                        className="text-app-text-secondary font-plusJakartaSans font-normal text-[10px]"
                      >
                        {location}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-[13.89px] mb-1 text-app-text-primary font-plusJakartaSans font-normal">
                    Language
                  </p>
                  <DropDown
                    dataArray={advertLanguages}
                    placeHolder="All"
                    isOpen={() => setIsDropdownOpen(!isDropdownOpen)}
                    onChange={(value: string) => {
                      handleInputChange(value, "language");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <p className="font-plusJakartaSans font-normal text-[13.89px] text-app-text-primary mb-3 mt-3">
              Advert Placement
            </p>
            <div className="mb-4 flex items-center justify-start gap-2">
              <div>
                <RadioButtonGroupComponent
                  onChange={(value) => {
                    handleInputChange(value, "advert_placement");
                  }}
                  value={form.advert_placement}
                  name=""
                  options={[
                    {
                      id: 1,
                      label: "General advert Placement Pricing",
                      value: "general",
                    },
                  ]}
                />
              </div>
              <InformationIcon
                width={16}
                height={16}
                onClick={() => {
                  setIsCreateAdvertModelOpen(true);
                }}
              />
            </div>
            <div className="mb-4 flex items-center justify-start gap-2">
              <div>
                <RadioButtonGroupComponent
                  onChange={(value) => {
                    handleInputChange(value, "advert_placement");
                  }}
                  value={form.advert_placement}
                  name=""
                  options={[
                    {
                      id: 1,
                      label: "Notification Placement Pricing",
                      value: "notification",
                    },
                  ]}
                />
              </div>
              <InformationIcon
                width={16}
                height={16}
                onClick={() => {
                  setIsCreateAdvertModelOpen(true);
                }}
              />
            </div>
            <div className="mb-8">
              <RadioButtonGroupComponent
                onChange={(value) => {
                  handleInputChange(value, "advert_placement");
                }}
                value={form.advert_placement}
                name=""
                options={[{ id: 3, label: "Both", value: "both" }]}
              />
            </div>
            <div className="mt-10">
              <RadioButtonGroupComponent
                name=""
                options={[
                  {
                    id: 1,
                    label: "Ios",
                    value: "ios",
                  },
                  {
                    id: 2,
                    label: "Android",
                    value: "android",
                  },
                  { id: 3, label: "Web", value: "web" },
                  { id: 4, label: "All", value: "all" },
                ]}
                isMultiSelect
                onChange={(value) => {
                  handleInputChange(value, "platform");
                }}
                value={form.platform}
              />
            </div>
          </div>
          <div className="mt-12">
            <p className="mb-1 text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
              Daily Budget
            </p>
            <div className="mt-2 border-[1.6px] rounded-xl border-app-border-advert px-8 py-6">
              <p
                className="mb-1 font-plusJakartaSans font-normal text-[12px]"
                style={{ color: "#808080" }}
              >
                Est.Reach 200-200 people per day
              </p>
              <div className="mt-5 w-2/3">
                <RadioButtonGroupComponent
                  onChange={(value) => {
                    handleInputChange(value, "daily_budget_type");
                  }}
                  value={form.daily_budget_type}
                  name=""
                  options={advertDailyBudgets.slice(0, -1)}
                />
              </div>
              <div className="mb-4 mt-4 flex items-center justify-start gap-2">
                <div>
                  <RadioButtonGroupComponent
                    name=""
                    options={advertDailyBudgets.slice(-1)}
                    onChange={(value) => {
                      handleInputChange(value, "daily_budget_type");
                    }}
                    value={form.daily_budget_type}
                  />
                </div>
              </div>
              <div className="ml-8">
                <InputComponent
                  placeholder="Custom Amount"
                  value={form.daily_budget.toString()}
                  disabled={
                    form.daily_budget_type !== "ADB00005" ? true : false
                  }
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, "");
                    handleInputChange(Number(numericValue), "daily_budget");
                  }}
                />
              </div>
              <div className="ml-8 mt-4">
                <p className="mb-1 text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
                  Duration
                </p>
                <InputComponent
                  placeholder="0 Days"
                  value={form.advert_duration.toString()}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, "");
                    handleInputChange(Number(numericValue), "advert_duration");
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-12">
            <div>
              <button
                className="w-full font-plusJakartaSans font-normal text-[14.57px] bg-app-button-primary text-app-text-tertiary py-3 px-4 rounded-lg"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Preview Advert
              </button>
            </div>
            <div>
              <button
                className="w-full  bg-app-button-primary text-app-text-tertiary font-plusJakartaSans font-normal text-[14.57px] py-3 px-4 rounded-lg"
                onClick={() => handleSubmit()}
              >
                Create Advert
              </button>
            </div>
          </div>
        </div>
      </div>
      <PreviewAdvertise
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {/* verification complete */}
      {isCreateAdvert && (
        <div
          className="fixed inset-0 bg-opacity-50 flex items-end justify-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={() => setIsCreateAdvert(false)}
        >
          <div
            className={`bg-app-background-primary w-full max-w-md p-6 sm:p-8 rounded-t-3xl shadow-xl transform transition-transform duration-300 ease-out ${
              isCreateAdvert ? "translate-y-0" : "translate-y-full" // Animation handled by presence/absence of component
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
          >
            <div className="flex flex-col items-center mb-6">
              <div className="mb-4">
                <CheckMarkGif />
              </div>
              <p className="text-app-text-primary font-plusJakartaSans text-sm mb-6 text-center">
                Advert Created
              </p>
            </div>
          </div>
        </div>
      )}
      <AdvertModel
        isOpen={isCreateAdvertModelOpen}
        onClose={() => setIsCreateAdvertModelOpen(false)}
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

export default page;
