import { config } from "@/config";
import { getToken } from "@/utils/authUtils";

// ---------- types --------------
type registrationForm = {
  email: string;
  password: string;
  language: string;
  //  confirm_password: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  referralCode?: string;
  aboveLegalAge: Boolean;
  termsAndConditionsAccepted: Boolean;
  subscribedToNewsletter: Boolean;
};

type verificationEmailForm = {
  email: string;
  otp: string;
};

type googleSignInForm = {
  token: string;
};

type loginForm = {
  email: string;
  password: string;
};

const commonUrl = `${config.baseUrl}`;

export async function register(dataObj: registrationForm) {
  try {
    const res = await fetch(`${commonUrl}/users/register`, {
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

export async function send_beta_code(email: string) {
  try {
    const res = await fetch(`${commonUrl}/otp/create-user-beta-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:email}),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function google_sign_in(dataObj: googleSignInForm) {
  try {
    const res = await fetch(`${commonUrl}/users/google-signin/`, {
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

export async function google_sign_up(dataObj: googleSignInForm) {
  try {
    const res = await fetch(`${commonUrl}/users/google-signup/`, {
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

export async function google_sign_up_complete(dataObj: {
  aboveLegalAge: boolean;
  gender: string;
  referralCode: string;
  subscribedToNewsletter: boolean;
  termsAndConditionsAccepted: boolean;
  dateOfBirth: string;
}) {
  try {
    const res = await fetch(`${commonUrl}/users/google-signup-complete/`, {
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

export async function sendPasswordResetEmail(passwordResetForm: {
  email: string;
}) {
  try {
    const res = await fetch(`${commonUrl}/users/send-password-reset-email/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordResetForm),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function resetPassword(resetForm: {
  newPassword: string;
  reset_password_token: string | null;
}) {
  try {
    const res = await fetch(`${commonUrl}/users/reset-password/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resetForm),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function passkeyRegistration() {
  try {
    const res = await fetch(`${commonUrl}/passkeys/register/start`, {
      method: "POST",
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

export async function finishPasskeyRegistration(dataObj: any) {
  try {
    const res = await fetch(`${commonUrl}/passkeys/register/finish`, {
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

export async function startSigninPasskey() {
  try {
    const res = await fetch(`${commonUrl}/passkeys/authenticate/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: `${getToken()}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function finishSigninPasskey(dataObj: any) {
  try {
    const res = await fetch(`${commonUrl}/passkeys/authenticate/finish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: `${getToken()}`,
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
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}
