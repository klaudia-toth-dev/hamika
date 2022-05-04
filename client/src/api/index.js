import axios from "axios";

const API = axios.create({ baseUrl: "http://localhost:8000/" });

API.interceptors.request.use((config) => {
  if (localStorage.getItem("profile")) {
    config.headers.common.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  console.log(config.headers, "auth interceptrog");
  return config;
});

console.log(API, "API");

export const signIn = async (formData) =>
  await API.post("api/users/login", formData);

export const signUp = async (formData) =>
  await API.post("api/users/register", formData);

export const additem = async (itemid) =>
  await API.post("/api/items/getitembyid", itemid);
