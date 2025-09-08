import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

//-------types----------
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

const commonUrl = `${config.baseUrl}/adverts`;

// create advert
export async function create_advert(dataObj: AdvertProps) {
  try {
    const res = await fetch(`${commonUrl}/create-advert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

type uploadAdvertImageProps = {
  advert_image: string;
  destination: string;
};

// upload advert image
export async function upload_advert_image(formData: FormData) {
  try {
    const res = await fetch(`${commonUrl}/create-advert-img`, {
      method: "POST",
      headers: {
        authorization: `${getToken()}`,
      },
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get all call to actions
export async function get_all_call_to_actions() {
  try {
    const res = await fetch(`${commonUrl}/get-all-advert-call-to-actions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get all advert regions
export async function get_all_advert_regions() {
  try {
    const res = await fetch(`${commonUrl}/get-all-advert-regions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get all advert languages
export async function get_all_advert_languages() {
  try {
    const res = await fetch(`${commonUrl}/get-all-advert-languages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get all advert daily budget types
export async function get_all_advert_daily_budget_types() {
  try {
    const res = await fetch(`${commonUrl}/get-all-advert-daily-budgets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get advert saved list
export async function get_advert_saved_list() {
  try {
    const res = await fetch(`${commonUrl}/get-saved-adverts-by-user-id`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

// get advert by id
export async function get_advert_by_id(advertId: string) {
  try {
    const res = await fetch(`${commonUrl}/get-advert-by-id/${advertId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
