import CryptoJS from "crypto-js";

const SECRET_KEY = "542f6cee-a3d2-4f25-91b2-e485439d444b";
const STATE = "pilar-state";

// Save Data
export const storeSecureData = (value) => {
  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString();
  localStorage.setItem(STATE, encryptedData);
};

// Get Data
export const getSecureData = () => {
  const encryptedData = localStorage.getItem(STATE);
  if (!encryptedData) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error("Failed to decrypt data:", error);
    return null;
  }
};

// Hapus Data
export const removeSecureData = () => {
  localStorage.removeItem(STATE);
};

export const checkTokenValidity = () => {
  const loginData = getSecureData(STATE);
  if (!loginData) {
    console.log("No data found!");
    return false;
  }

  const now = new Date();
  const expiredAt = new Date(loginData.datetimeExpired);

  if (now > expiredAt) {
    console.log("Token has expired!");
    removeSecureData("userLogin"); // Hapus data yang sudah expired
    return false;
  }

  console.log("Token is still valid!");
  return true;
};