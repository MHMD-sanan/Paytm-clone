import { axiosInstance } from "./index";

/**
 * Function to perform user login.
 * @param {Object} formData - Login form data.
 * @returns {Promise} Response data from the server.
 * @throws Throws an error if the request fails.
 */
export const loginUser = async (formData) => {
  try {
    const response = await axiosInstance.post(`/api/auth/login`, formData);
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
    const response = await axiosInstance.post(`/api/auth/register`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
