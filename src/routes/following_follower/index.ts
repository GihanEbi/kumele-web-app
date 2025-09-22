import { config } from "@/config";
import { getToken } from "@/utils/authUtils";
const commonUrl = `${config.baseUrl}/following-follower`;

// function to follow a user
export async function followUser(followData: { following_id: string }) {
  try {
    const res = await fetch(`${commonUrl}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
      body: JSON.stringify(followData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
}

// function to unfollow a user
export async function unfollowUser(unfollowData: { following_id: string }) {
  try {
    const res = await fetch(`${commonUrl}/unfollow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${getToken()}`,
      },
      body: JSON.stringify(unfollowData),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error unfollow user:", error);
    throw error;
  }
}

// function to get followers
export async function getFollowers() {
  try {
    const res = await fetch(`${commonUrl}/get-followers`, {
      method: "GET",
      headers: {
        authorization: `${getToken()}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw error;
  }
}

// function to get following
export async function getFollowing() {
  try {
    const res = await fetch(`${commonUrl}/get-following`, {
      method: "GET",
      headers: {
        authorization: `${getToken()}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching following:", error);
    throw error;
  }
}

// function to get following and followers count
export async function getFollowingFollowerCount() {
  try {
    const res = await fetch(`${commonUrl}/get-followers-following-count`, {
      method: "GET",
      headers: {
        authorization: `${getToken()}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching following and followers count:", error);
    throw error;
  }
}
