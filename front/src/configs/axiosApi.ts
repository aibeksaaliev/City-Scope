import axios from "axios";
import { apiURL } from "@/configs/constants";

export const axiosApi = axios.create({
  baseURL: apiURL,
});
