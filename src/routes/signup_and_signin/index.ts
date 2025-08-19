import { config } from "@/config";

// ---------- types --------------
type registrationForm = {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
  gender: string;
  date_of_birth: string;
  //   referrer_code: string;
  above_legal_age: Boolean;
  terms_and_conditions: Boolean;
  subscribe_to_newsletter: Boolean;
};

type verificationEmailForm = {
  email: string;
  otp: string;
};

type googleSignInForm = {
  auth_token: string;
};

type loginForm = {
  email: string;
  password: string;
};

const commonUrl = `${config.baseUrl}`;

export async function register(dataObj: registrationForm) {
  try {
    const res = await fetch(`${commonUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function verification_email(dataObj: verificationEmailForm) {
  try {
    const res = await fetch(`${commonUrl}/otp/verify-email/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function google_sign_in(dataObj: googleSignInForm) {
  try {
    const res = await fetch(`${commonUrl}/google-signin/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function login(dataObj: loginForm) {
  try {
    const res = await fetch(`${commonUrl}/users/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function send_otp_for_verification(email: string) {
  try {
    const res = await fetch(`${commonUrl}/otp/send-otp-email-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email}),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
