import axios from "axios";

// const BASE_URL =
//   "https://crypto-app-backend-git-main-mahan-soodbakhshs-projects.vercel.app/api";
const BASE_URL = "http://localhost:3000/api";

const apiConfig = axios.create({
  baseURL: BASE_URL,
});

export { apiConfig };
