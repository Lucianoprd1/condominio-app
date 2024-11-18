import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios"; // Importar Axios
import BgIMG from "../assets/background.png";
import LogoIMG from "../assets/logo-sgc.png";

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
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      // Enviar datos al backend
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      const user = response.data;

      // Guardar información del usuario en el localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      // Mostrar mensaje de éxito y redirigir según el rol
      setSuccess("Accediendo al sistema...");
      setError("");

      setTimeout(() => {
        navigate(user.role === "admin" ? "/admin/dashboard" : "/dashboard");
      }, 2000);
    } catch (err) {
      // Manejo de errores
      setError(
        err.response?.data?.message || "Error al iniciar sesión. Inténtelo nuevamente."
      );
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
            paddingTop: 1,
            paddingBottom: 2,
            paddingLeft: 5,
            paddingRight: 5,
            minWidth: 400,
            minHeight: 700,
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto",
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
            sx={{
              width: 300,
              height: 125,
              textAlign: "center",
              color: "primary.main",
              fontSize: "h5.fontSize",
              fontWeight: "bold",
              margin: "0 auto",
            }}
          >
            Sistema de Gestión de Condominos
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              minWidth: 300,
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
              sx={{
                bgcolor: "white",
                boxShadow: 1,
              }}
              autoComplete="email"
            />
            <TextField
              required
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              variant="filled"
              fullWidth
              sx={{
                bgcolor: "white",
                boxShadow: 1,
              }}
              autoComplete="current-password"
            />
            {success && (
              <Box sx={{ color: "green", fontWeight: "bold", marginTop: 2 }}>
                {success}
              </Box>
            )}
            {error && (
              <Box
                sx={{
                  color: "red",
                  fontWeight: "bold",
                  marginTop: 2,
                  padding: 2,
                  border: "1px solid red",
                  borderRadius: 1,
                  width: "300px",
                  textAlign: "center",
                  fontSize: "12px",
                }}
              >
                {error}
              </Box>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: 1,
                width: "100%",
                height: "50px",
                fontWeight: "bold",
                boxShadow: 10,
              }}
            >
              Iniciar sesión
            </Button>
          </Box>
          <Box
            sx={{
              mt: 4,
              paddingBottom: 3,
              width: "100%",
              textAlign: "center",
              color: "text.primary",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            ¿No tiene cuenta?{" "}
            <Link to="/register" style={{ color: "#009688" }}>
              Regístrese aquí.
            </Link>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}