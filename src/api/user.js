import axios from "axios";

const BASE_URL = "http://localhost:4000";
// const BASE_URL = "https://peko-pkkd.onrender.com";

/**
 * Function to perform user login.
 * @param {Object} formData - Login form data.
 * @returns {Promise} Response data from the server.
 * @throws Throws an error if the request fails.
 */
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Function to perform user signup.
 * @param {Object} formData - Signup form data.
 * @returns {Promise} Response data from the server.
 * @throws Throws an error if the request fails.
 */
export const signupUser = async (formData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/auth/register`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Function to search for a user.
 * @param {string} recipient - Recipient username.
 * @returns {Promise} Response data from the server.
 * @throws Throws an error if the request fails.
 */
export const searchUser = async (recipient) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/transaction/findUser`,
      recipient,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Function to get transaction history.
 * @returns {Promise} Response data from the server.
 * @throws Throws an error if the request fails.
 */
export const getHistory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/transaction/history`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Function to get payment requests.
 * @returns {Promise} Response data from the server.
 * @throws Throws an error if the request fails.
 */
export const getRequests = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/request/getRequests`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Function to send a payment request.
 * @param {string} recipient - Recipient username.
 * @returns {Promise} Response data from the server.
 * @throws Throws an error if the request fails.
 */
export const sendRequest = async (recipient) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/request/sendRequest`,
      recipient,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Function to generate an OTP.
 * @param {string} recipient - Recipient username.
 * @returns {Promise} Response data from the server.
 * @throws Throws an error if the request fails.
 */
export const generateOtp = async (recipient) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/otp/sendOtp`,
      recipient,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**
 * Function to verify an OTP and make a transaction.
 * @param {string} recipient - Recipient username.
 * @returns {Promise} Response data from the server.
 * @throws Throws an error if the request fails.
 */
export const verifyOtp = async (recipient) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/otp/verifyOtp`,
      recipient,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
