const axios = require("axios");

const BASE_URL = "http://localhost:4000";
// const BASE_URL = "https://peko-pkkd.onrender.com";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  }, 
});
