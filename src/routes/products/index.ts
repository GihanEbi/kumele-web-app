import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

const commonUrl = `${config.baseUrl}/products`;

// get all products
export async function get_all_products() {
  try {
    const res = await fetch(`${commonUrl}/get-all-products`, {
      method: "GET",
      headers: {
        authorization: `${getToken()}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
}

// get all product types
export async function get_all_product_types() {
  try {
    const res = await fetch(`${commonUrl}/get-product-types`, {
      method: "GET",
      headers: {
        authorization: `${getToken()}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching all product types:", error);
    throw error;
  }
}

// get product by id
export async function get_product_by_id(productId: string) {
  try {
    const res = await fetch(`${commonUrl}/get-product/${productId}`, {
      method: "GET",
      headers: {
        authorization: `${getToken()}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    throw error;
  }
}

// get products by type
export async function get_products_by_type(type: string) {
  try {
    const res = await fetch(`${commonUrl}/get-products-by-type/${type}`, {
      method: "GET",
      headers: {
        authorization: `${getToken()}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products by type:", error);
    throw error;
  }
}
