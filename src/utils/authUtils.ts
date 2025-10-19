"use client";

export function saveToken(token: string) {
  try {
    localStorage.setItem("token", token);
  } catch (error) {
    console.log(error);
  }
}

export function saveUserNamePassword({ username, password }: { username: string; password: string }) {
  try {
    localStorage.setItem("user_credentials", JSON.stringify({ username, password }));
  } catch (error) {
    console.log(error);
  }
}

export function getUserNamePassword() {
  try {
    const data = localStorage.getItem("user_credentials");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// remove token from local storage
export function removeUserNamePassword() {
  try {
    localStorage.removeItem("user_credentials");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function removeToken() {
  try {
    localStorage.removeItem("token");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function removeNewPartnershipUser() {
  try {
    localStorage.removeItem("new_partnership_user");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function removePartnershipUserToken() {
  try {
    localStorage.removeItem("partnership_token");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
