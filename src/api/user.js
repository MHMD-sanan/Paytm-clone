import axios from "axios";

const BASE_URL = "http://localhost:4000";
//const BASE_URL="https://peko-pkkd.onrender.com"

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, formData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
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

export const sendMoney = async (recipient) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/transaction/transfer`,
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

//payment request apis
export const getRequets = async () => {
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

export const sendRequets = async (recipient) => {
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

//otp generate
export const genrateOtp = async (recipient) => {
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

//to verify otp
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

