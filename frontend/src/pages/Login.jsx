import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Button, TextField, Alert } from "@mui/material";
import axios from "axios";
import BgIMG from "../assets/background.png";
import LogoIMG from "../assets/logo-sgc.png";
import { useAuth } from "../context/AuthContext";
import API from "../api/axiosConfig";

// Configure axios defaults
//axios.defaults.baseURL = "http://localhost:3000";
//axios.defaults.withCredentials = true;

const theme = createTheme({
  palette: {
    primary: {
      main: "#173A5E",
    },
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#173A5E",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      main: "#009688",
    },
  },
});

export default function Login() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      console.log("Login form data:", formData);
      const response = await API.post("/login", formData);
      console.log("Login response:", response.data);

      if (response.data && response.data.user) {
        // Verify setIsAuthenticated exists
        if (typeof setIsAuthenticated !== 'function') {
          console.error('setIsAuthenticated is not available');
          return;
        }

        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        const role = response.data.user.role;
        console.log("Role:", role);
        
        // Force navigation after state update
        setTimeout(() => {
          navigate(role === "admin" ? "/admin" : "/dashboard");
        }, 0);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Error al iniciar sesión. verifique sus credenciales.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage: `url(${BgIMG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.8)",
            boxShadow: 1,
            borderRadius: 3,
            padding: 5,
            minWidth: 400,
            minHeight: 600,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: 2,
            }}
          >
            <img
              src={LogoIMG}
              alt="Logo S.G.C."
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              required
              id="email"
              name="email"
              label="Correo"
              type="email"
              variant="filled"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              sx={{
                bgcolor: "white",
                boxShadow: 1,
              }}
            />
            <TextField
              required
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              variant="filled"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              sx={{
                bgcolor: "white",
                boxShadow: 1,
              }}
            />
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 3,
                height: "50px",
                fontWeight: "bold",
              }}
            >
              Iniciar sesión
            </Button>
          </Box>
          
          <Box
            sx={{
              mt: 4,
              textAlign: "center",
              color: "text.primary",
              fontWeight: "bold",
            }}
          >

          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}