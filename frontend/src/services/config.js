import axios from "axios";

export const serverURL = "http://localhost:3008/api";
export const axiosClient = axios.create({
  baseURL: serverURL,
  withCredentials: false,
});
