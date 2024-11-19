import API from "./axiosConfig";

// Iniciar sesión
export const login = async (email, password) => {
  try {
    const response = await API.post("/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Registrar usuario
export const register = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);