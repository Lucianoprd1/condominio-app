import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // URL base del backend
  withCredentials: true, // Permitir cookies si el backend las utiliza
});

export default API;