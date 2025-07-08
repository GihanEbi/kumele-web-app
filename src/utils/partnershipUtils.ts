export function savePartnershipToken(token: string) {
  try {
    localStorage.setItem("partnership_token", token);
  } catch (error) {
    console.log(error);
  }
}

export function getPartnershipToken() {
  try {
    return localStorage.getItem("partnership_token");
  } catch (error) {
    console.log(error);
    return null;
  }
}

export function removePartnershipToken() {
  try {
    localStorage.removeItem("partnership_token");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export function saveNewPartnershipUser(token: string) {
  try {
    localStorage.setItem("new_partnership_user", token);
  } catch (error) {
    console.log(error);
  }
}

export function getNewPartnershipUser() {
  try {
    return localStorage.getItem("new_partnership_user");
  } catch (error) {
    console.log(error);
    return null;
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

