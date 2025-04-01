import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.bigdates.com.br:3240/",
  headers: {
    "Content-Type": "application/json",
  },
});
