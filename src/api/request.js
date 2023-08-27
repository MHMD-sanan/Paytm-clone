import { axiosInstance } from "./index";

/**
 * Function to get payment requests.
 * @returns {Promise} Response data from the server.
 * @throws Throws an error if the request fails.
 */
export const getRequests = async () => {
  try {
    const response = await axiosInstance.get(`/api/request/getRequests`);
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
    const response = await axiosInstance.post(
      `/api/request/sendRequest`,
      recipient
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};