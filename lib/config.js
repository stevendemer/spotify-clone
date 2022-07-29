import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:3000",
  timeout: 6000,
});

export default instance;
