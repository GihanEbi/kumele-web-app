"use client";

import LoadingComponent from "@/components/LoadingComponent/LoadingComponent";
import React, { useEffect, useRef, useState } from "react";
import InputComponent from "@/components/InputComponent/InputComponent";
import {
  AdvertiseIcon,
  BoldIcon,
  BulletedListIcon,
  HeaderOneIcon,
  ImageIcon,
  InstagramIcon,
  ItalicIcon,
  LinkIcon,
  MovieIcon,
  NewYoutubeIcon,
  NumberListIcon,
  OkayGreenIcon,
  OkayIcon,
  PictureIcon,
  PubIcon,
  SportsIcon,
  TwitterIcon,
  YoutubeIcon,
  BlogFacebookIcon,
  BlogInstagramIcon,
  BlogPinterestIcon,
  BlogTwitterIcon,
  InsertBannerImageIcon,
  Header3Icon,
  Header2Icon,
  DeleteIcon,
  OkayRedIcon,
} from "../../../../public/svg-icons/icons";
import DropDown from "@/components/DropDown/DropDown";
import TextAreaComponent from "@/components/TextAreaComponent/TextAreaComponent";
import BlogPreviewModel from "./models/PreviewModel";
import InsertLinkModal from "./models/InsertLinkModal";
import SuccessModel from "@/components/Models/SuccessModel/SuccessModel";
import ErrorModel from "@/components/Models/ErrorModel/ErrorModel";
import { create_banner_image, create_blog } from "@/routes/Blogs APIs";
import VerticalHobbyScroller from "@/components/VerticalHobbyScroller/VerticalHobbyScroller";
import { fetch_profile, getAllUserData } from "@/routes/profile";

type createUpdateBlogForm = {
  event_category_id: string;
  blog_name: string;
  destination: string;
  blog_img_url: any;
  banner_img_url: string;
  blog_video_link: string;
  youtube_link: string;
  facebook_link: string;
  instagram_link: string;
  pinterest_link: string;
  twitter_link: string;
  blog_content: string;
};

type ChooseInterestsProps = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type fetch_user = {
  id: string;
  userImg: string;
  userName: string;
};

const page = () => {
  //   loading state
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [previewBlog, setPreviewBlog] = useState(false);
  const [isInsertLinkModalOpen, setIsInsertLinkModalOpen] = useState(false);

  // form data
  const [form, setForm] = useState<createUpdateBlogForm>({
    event_category_id: "",
    blog_name: "",
    destination: "blog",
    blog_img_url: "",
    banner_img_url: "",
    blog_video_link: "",
    youtube_link: "",
    facebook_link: "",
    instagram_link: "",
    pinterest_link: "",
    twitter_link: "",
    blog_content: "",
  });

  // ---------- show success model -----------
  const [showSuccessModel, setShowSuccessModel] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  // ---------- show error model -----------
  const [showErrorModel, setShowErrorModel] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // selected category other data
  const [selectedCategoryData, setSelectedCategoryData] =
    useState<ChooseInterestsProps | null>(null);

  // set temporary preview image url
  const [tempImageConfig, setTempImageConfig] = useState<string | undefined>(
    undefined
  );

  // state to tempSocialLink
  const [tempSocialLink, setTempSocialLink] = useState<string>("");
  const [tempSocialLinkComponent, setTempSocialLinkComponent] =
    useState<string>("youtube_link");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  // state for user data
  const [userData, setUserData] = useState<fetch_user | null>({
    id: "",
    userImg: "",
    userName: "",
  });

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerFileInput2 = () => {
    fileInputRef2.current?.click();
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await getAllUserData();
      if (data.success) {
        setUserData({
          id: data.data.id,
          userImg: data.data.profilepicture,
          userName: data.data.username,
        });
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching interests:", error);
    } finally {
      setLoading(false);
    }
  };

  // -------- handleChange for input fields ---------
  const handleInputChange = (value: string | Boolean, name: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUploadTenderDocument = async (file: any, name: string) => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      if (file) {
        const formData = new FormData();
        formData.append("destination", "blog");
        formData.append("banner_img_url", file);

        const data = await create_banner_image(formData);
        if (data.success) {
          setForm((prev) => ({
            ...prev,
            [name]: data.banner_img_url,
          }));
        } else {
          setError(data?.message || "An error occurred");
          setShowErrorModel(true);
          setTimeout(() => setShowErrorModel(false), 3600);
          return;
        }
      }
    } catch (error) {
      setError("An error occurred");
      setShowErrorModel(true);
      setTimeout(() => setShowErrorModel(false), 3600);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const data = await create_blog(form);
      if (data?.success) {
        setSuccess("Your blog has been created successfully.");
        setShowSuccessModel(true);
        setTimeout(() => setShowSuccessModel(false), 3600);
        // reset form
        setForm({
          event_category_id: "",
          blog_name: "",
          destination: "blog",
          blog_img_url: "",
          banner_img_url: "",
          blog_video_link: "",
          youtube_link: "",
          facebook_link: "",
          instagram_link: "",
          pinterest_link: "",
          twitter_link: "",
          blog_content: "",
        });
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

  /*--------Insert Link Modal Handlers --------*/
  const openModal = () => setIsInsertLinkModalOpen(true);
  const closeModal = () => setIsInsertLinkModalOpen(false);
  return (
    <div
      className={`overflow-y-auto max-h-screen no-scrollbar ${
        isDropdownOpen ||
        previewBlog ||
        isInsertLinkModalOpen ||
        showSuccessModel ||
        showErrorModel
          ? "bg-k-background-secondary"
          : "bg-k-background-primary"
      } `}
    >
      {loading && (
        <div className="flex items-center justify-center min-h-screen">
          <LoadingComponent />
        </div>
      )}
      <div className={`min-h-screen flex flex-col`}>
        <div className={`w-full max-w-md px-4 top-0 left-0 right-0 `}>
          {/* Header */}
          <header
            className={`fixed w-full pt-[64px] flex items-center mb-10 z-1000 ${
              isDropdownOpen || previewBlog || isInsertLinkModalOpen
                ? "bg-k-background-secondary"
                : "bg-k-background-primary"
            } `}
          >
            <h1 className="mt-4 text-app-text-primary font-plusJakartaSans font-bold text-[23px]">
              Create Blog
            </h1>
          </header>
        </div>
        {/* body section */}

        <div className="space-y-1 mt-[130px] px-10 mb-50">
          <div>
            <p className="font-plusJakartaSans font-normal text-[13.89px] text-app-text-primary mb-3">
              Advert Category
            </p>
            <VerticalHobbyScroller
              selectedValue={form.event_category_id}
              onChange={(value: ChooseInterestsProps) => {
                handleInputChange(value.id, "event_category_id");
                setSelectedCategoryData(value);
              }}
            />
          </div>
          {/* blog name */}
          <div>
            <p className="text-app-text-primary font-plusJakartaSans font-normal text-[13.89px] mb-[10px]">
              Blog Name
            </p>
            <div className="space-y-4 mb-[24px]">
              <div className="relative">
                <InputComponent
                  placeholder="Add a title"
                  value={form.blog_name}
                  onChange={(e) => {
                    handleInputChange(e.target.value, "blog_name");
                  }}
                />
              </div>
            </div>
          </div>
          {/* banner image */}
          <div className=" mb-[24px] ">
            <p className="mb-[10px] text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
              Banner Image
            </p>
            <div
              className="flex justify-between w-[168.73px] h-[38px] bg-app-background-card-secondary rounded-lg  px-2 pt-2"
              onClick={triggerFileInput}
            >
              <div>
                <ImageIcon
                  className="text-white dark:text-black"
                  width={20}
                  height={20}
                />
              </div>
              <p className="font-md text-app-text-tertiary font-plusJakartaSans font-normal text-[12.98px] mb-[10px]">
                Insert banner image
              </p>
              <input
                type="file"
                ref={fileInputRef}
                //onChange={handleImageUpload}
                onChange={(e: any) => {
                  handleFileUploadTenderDocument(
                    e.target.files[0],
                    "banner_img_url"
                  );
                }}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
          {/* social media links */}
          <div className="mb-[37px]">
            <p className="mb-[10px] text-app-text-primary font-plusJakartaSans font-normal text-[13.89px]">
              Social Media Links
            </p>
            <div className="flex gap-2">
              <div className="space-y-3">
                <div className="relative w-[176px] h-[35px]">
                  <InputComponent
                    placeholder="www.example.com"
                    value={tempSocialLink}
                    onChange={(e) => {
                      setTempSocialLink(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <DropDown
                  dataArray={[
                    { label: <NewYoutubeIcon />, value: "youtube_link" },
                    { label: <BlogFacebookIcon />, value: "facebook_link" },
                    { label: <BlogInstagramIcon />, value: "instagram_link" },
                    { label: <BlogPinterestIcon />, value: "pinterest_link" },
                    { label: <BlogTwitterIcon />, value: "twitter_link" },
                  ]}
                  placeHolder={<NewYoutubeIcon className="w-[24px] h-[24px]" />}
                  onChange={(value: string) => {
                    setTempSocialLinkComponent(value);
                    setTempSocialLink(
                      form[value as keyof createUpdateBlogForm]
                    );
                    console.log(value);
                  }}
                  itemSelected={tempSocialLinkComponent || undefined}
                  isOpen={() => setIsDropdownOpen(!isDropdownOpen)}
                />
              </div>
              <div
                className="bg-app-okay-icon-filter rounded-lg p-2 w-[38px] h-[38px]"
                onClick={() => {
                  if (tempSocialLink !== "") {
                    handleInputChange(tempSocialLink, tempSocialLinkComponent);
                  } else {
                    setError("Please provide a social link");
                    setShowErrorModel(true);
                    setTimeout(() => setShowErrorModel(false), 3600);
                  }
                }}
              >
                {form &&
                form[tempSocialLinkComponent as keyof createUpdateBlogForm] !==
                  "" ? (
                  <OkayGreenIcon />
                ) : (
                  <OkayIcon className="text-app-icon" />
                )}
              </div>
            </div>
          </div>
          {/* insert image section */}
          <div className="flex justify-between items-center mb-6 gap-2">
            <div
              className="w-1/2 bg-app-background-card-secondary rounded-lg  px-2 pt-2 gap-2 flex justify-between"
              onClick={triggerFileInput2}
            >
              <ImageIcon
                className="text-white dark:text-black mt-[3px]"
                width={20}
                height={20}
              />
              <p className="font-md text-white dark:text-black font-plusJakartaSans font-normal text-[12.98px] mb-[10px]">
                Insert image
              </p>
              <input
                type="file"
                ref={fileInputRef2}
                onChange={(e: any) => {
                  setForm((prev) => ({
                    ...prev,
                    blog_img_url: e.target.files[0],
                  }));
                  setTempImageConfig(URL.createObjectURL(e.target.files[0]));
                }}
                accept="image/*"
                className="hidden"
              />
            </div>

            <InputComponent
              placeholder="paste video link"
              value={form.blog_video_link}
              onChange={(e) => {
                handleInputChange(e.target.value, "blog_video_link");
              }}
              icon={
                <NewYoutubeIcon
                  className="text-app-icon mt-[3px]"
                  width={20}
                  height={20}
                />
              }
            />
          </div>
          {/* blog writing section */}
          <div>
            <div className="flex mb-[34px] items-center gap-3">
              <div>
                <DropDown
                  dataArray={[
                    { label: <HeaderOneIcon />, value: "facebook" },
                    { label: <Header2Icon />, value: "twitter" },
                    { label: <Header3Icon />, value: "instagram" },
                  ]}
                  placeHolder={<HeaderOneIcon />}
                  // isOpen={(value: boolean) => {
                  //   setIsDropdownOpen(value);
                  // }}
                  isOpen={() => setIsDropdownOpen(!isDropdownOpen)}
                />
              </div>
              <div>
                <BoldIcon />
              </div>
              <div>
                <ItalicIcon />
              </div>
              <div>
                <BulletedListIcon />
              </div>
              <div>
                <NumberListIcon />
              </div>
              <div>
                <button onClick={openModal} className="">
                  <LinkIcon />
                </button>
              </div>
            </div>
            <div>
              <TextAreaComponent
                placeholder="Write your blog..."
                value={form.blog_content}
                onChange={(e) =>
                  handleInputChange(e.target.value, "blog_content")
                }
              />
            </div>
          </div>
          {/* submit button */}
          <div className="flex flex-col items-center mt-8">
            <button
              className="w-1/2 bg-app-button-primary text-app-text-tertiary font-plusJakartaSans font-normal text-[14.57px] py-3 px-2 rounded-lg"
              onClick={() => {
                setPreviewBlog(true);
              }}
            >
              Preview Blog
            </button>
          </div>
        </div>
      </div>
      <BlogPreviewModel
        blogData={form}
        tempImgUrl={tempImageConfig}
        isOpen={previewBlog}
        onClose={() => setPreviewBlog(false)}
        userImg={userData?.userImg || ""}
        userName={userData?.userName || ""}
        onBlogCreate={() => {
          setPreviewBlog(false);

          handleSubmit();
        }}
      />
      <InsertLinkModal isOpen={isInsertLinkModalOpen} onClose={closeModal} />

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
