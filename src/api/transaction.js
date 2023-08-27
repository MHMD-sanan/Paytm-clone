import { axiosInstance } from "./index";

/**
 * Function to get transaction history.
 * @returns {Promise} Response data from the server.
 * @throws Throws an error if the request fails.
 */
export const getHistory = async () => {
  try {
    const response = await axiosInstance.get(`/api/transaction/history`);
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
    const response = await axiosInstance.post(
      `/api/transaction/findUser`,
      recipient
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
    const response = await axiosInstance.post(
      `/api/transaction/sendOtp`,
      recipient
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
    const response = await axiosInstance.post(
      `/api/transaction/verifyOtp`,
      recipient
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};