import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

//-------types----------
type createUpdateBlogForm = {
  event_category_id: string;
  blog_name: string;
  destination: string;
  blog_img_url: string;
  banner_img_url: string;
  blog_video_link: string;
  youtube_link: string;
  facebook_link: string;
  instagram_link: string;
  pinterest_link: string;
  twitter_link: string;
  blog_content: string;
};

type createUpdateBannerImage = {
  destination: string;
  banner_img_url: string;
};

type commentToBlog = {
  comment: string;
  reply_to: string;
};

const commonUrl = `${config.baseUrl}/blogs`;

export async function create_blog(dataObj: createUpdateBlogForm) {
  const formData = new FormData();
  formData.append("event_category_id", dataObj.event_category_id);
  formData.append("blog_name", dataObj.blog_name);
  formData.append("destination", dataObj.destination);
  formData.append("blog_img_url", dataObj.blog_img_url);
  formData.append("banner_img_url", dataObj.banner_img_url);
  formData.append("blog_video_link", dataObj.blog_video_link);
  formData.append("youtube_link", dataObj.youtube_link);
  formData.append("facebook_link", dataObj.facebook_link);
  formData.append("instagram_link", dataObj.instagram_link);
  formData.append("pinterest_link", dataObj.pinterest_link);
  formData.append("twitter_link", dataObj.twitter_link);
  formData.append("blog_content", dataObj.blog_content);

  try {
    const res = await fetch(`${commonUrl}/create-blog`, {
      method: "POST",
      headers: {
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function update_blog(
  dataObj: createUpdateBlogForm,
  blogID: string
) {
  const formData = new FormData();
  formData.append("event_category_id", dataObj.event_category_id);
  formData.append("destination", dataObj.destination);
  formData.append("blog_name", dataObj.blog_name);
  formData.append("blog_img_url", dataObj.blog_img_url);
  formData.append("banner_img_url", dataObj.banner_img_url);
  formData.append("blog_video_link", dataObj.blog_video_link);
  formData.append("youtube_link", dataObj.youtube_link);
  formData.append("facebook_link", dataObj.facebook_link);
  formData.append("instagram_link", dataObj.instagram_link);
  formData.append("pinterest_link", dataObj.pinterest_link);
  formData.append("twitter_link", dataObj.twitter_link);
  formData.append("blog_content", dataObj.blog_content);

  try {
    const res = await fetch(`${commonUrl}/update-blog-by-id/${blogID}`, {
      method: "POST",
      headers: {
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get all blogs
export async function get_all_blogs() {
  try {
    const res = await fetch(`${commonUrl}/get-all-blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get all blog by user id
export async function get_all_blogs_by_user_id(userId: string) {
  try {
    const res = await fetch(`${commonUrl}/get-blog-by-user-id/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get all blog by category id
export async function get_all_blogs_by_category_id(categoryId: string) {
  try {
    const res = await fetch(
      `${commonUrl}/get-blog-by-category-id/${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `${getToken()}`, // Ensure getToken() returns a valid token
        },
      }
    );

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get all blog by id
export async function get_blog_by_id(blogId: string) {
  try {
    const res = await fetch(`${commonUrl}/get-blog-by-id/${blogId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// create banner image for blog
export async function create_banner_image(formData: FormData) {
  try {
    const res = await fetch(`${commonUrl}/create-banner`, {
      method: "POST",
      headers: {
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// like a blog
export async function like_blog(blogId: string) {
  try {
    const res = await fetch(`${commonUrl}/like-blog/${blogId}`, {
      method: "POST",
      headers: {
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get blog like count
export async function get_blog_like_count(blogId: string) {
  try {
    const res = await fetch(`${commonUrl}/get-blog-like-count/${blogId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get blog comments
export async function get_blog_comments(blogId: string) {
  try {
    const res = await fetch(`${commonUrl}/get-blog-comments/${blogId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// unlike a blog
export async function unlike_blog(blogId: string) {
  try {
    const res = await fetch(`${commonUrl}/unlike-blog/${blogId}`, {
      method: "POST",
      headers: {
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// comment to blog
export async function comment_on_blog(blogId: string, dataObj: commentToBlog) {
  try {
    const res = await fetch(`${commonUrl}/comment-blog/${blogId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
      body: JSON.stringify(dataObj),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// update banner image
export async function update_banner_image(blogId: string, formData: FormData) {
  try {
    const res = await fetch(`${commonUrl}/update-banner/${blogId}`, {
      method: "PUT",
      headers: {
        authorization: `${getToken()}`, // Ensure getToken() returns a valid token
      },
      body: formData,
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
