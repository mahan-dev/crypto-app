import axios from "axios";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000/api"
  : "https://crypto-app-backend-git-main-mahan-soodbakhshs-projects.vercel.app/api";

const apiConfig = axios.create({
  baseURL: BASE_URL,
});

export { apiConfig };
