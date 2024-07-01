import axios from "axios";
const axiosConfig = axios.create({
  baseURL: "https://luxshoes.netlify.app",
});

export default axiosConfig;
