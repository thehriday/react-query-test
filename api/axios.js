import axios from "axios";

const axiosClone = axios.create({
  baseURL: "https://9bab-113-11-39-15.ngrok.io",
});

export default axiosClone;
