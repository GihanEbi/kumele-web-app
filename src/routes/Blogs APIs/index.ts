import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

//-------types----------
type createBlogForm = {
  title: string;
  content: string;
  category: string;
  social_media_links: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  media_url_O: string;
  media_file_O: string;
  banner_image: string;
};

const commonUrl = `${config.baseUrl}/api/blogs/`;

export async function show_all_blogs() {
  try {
    const res = await fetch(`${commonUrl}/api/blogs/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`, // Uncomment if you need to send a token
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function create_blogs(dataObj: createBlogForm) {
  try {
    const res = await fetch(`${commonUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${getToken()}`, // Ensure getToken() returns a valid token
      },
      body: JSON.stringify(dataObj),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
