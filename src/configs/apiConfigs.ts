import axios from "axios";

const BASE_URL =
  "https://crypto-app-backend-git-main-mahan-soodbakhshs-projects.vercel.app/api";

const apiConfig = axios.create({
  baseURL: BASE_URL,
});

export { apiConfig };
