import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Para redireccionar a otras páginas.
import BgReservation from "../assets/reservations.jpg";
import LogoIMG from "../assets/logo-sgc.png";

function Reservation() {
  // Hook para la navegación
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Elimina todo el contenido del localStorage
    localStorage.clear();

    // Redirige al Login.jsx
    navigate("/login");
  };

  return (
    <>
      {/* Barra de navegación */}
      <AppBar
        position="static" // Fija la barra de navegación en la parte superior.
        sx={{
          backgroundColor: "white", // Fondo de la barra de navegación.
          backdropFilter: "blur(10px)", // Efecto de desenfoque.
          boxShadow: "3", // Sombra de la barra de navegación.
          padding: "10px", // Espaciado interno.
        }}
      >
        <Toolbar>
          {/* Logo del proyecto */}
          <Box
            component="img"
            src={LogoIMG} // Ruta de la imagen del logo.
            alt="Sistema de Gestión de Condomonios" // Texto alternativo de la imagen.
            sx={{
              height: 80, // Altura de la imagen.
              mr: 2, // Margen derecho.
            }}
          />

          {/* Espaciador para alinear los botones a la derecha */}
          <Box sx={{ flexGrow: 1 }}></Box>

          {/* Grupo de botones */}
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button
              sx={{
                color: "black", // Cambia el color del texto del botón.
                borderColor: "black", // Cambia el color del borde del botón.
                "&:hover": {
                  backgroundColor: "#001E3C", // Cambia el color de fondo cuando se hace hover.
                  color: "white", // Cambia el color del texto cuando se hace hover.
                },
                fontWeight: "bold", // Fuente en negrita.
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Inicio
              </Link>
            </Button>
            <Button
              sx={{
                color: "black", // Cambia el color del texto del botón.
                borderColor: "black", // Cambia el color del borde del botón.
                "&:hover": {
                  backgroundColor: "#001E3C", // Cambia el color de fondo cuando se hace hover.
                  color: "white", // Cambia el color del texto cuando se hace hover.
                },
                fontWeight: "bold", // Fuente en negrita.
              }}
            >
              <Link
                to="/reservation"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Reservas
              </Link>
            </Button>
            <Button
              onClick={handleLogout} // Llama a la función de cierre de sesión.
              sx={{
                color: "black", // Cambia el color del texto del botón.
                borderColor: "black", // Cambia el color del borde del botón.
                "&:hover": {
                  backgroundColor: "#001E3C", // Cambia el color de fondo cuando se hace hover.
                  color: "white", // Cambia el color del texto cuando se hace hover.
                },
                fontWeight: "bold", // Fuente en negrita.
              }}
            >
              Salir
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${BgReservation})`, // Imagen de fondo.
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh", // Altura del 80% de la pantalla.
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white", // Color de texto.
          textShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Sombra de texto.
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" gutterBottom>
            Reservaciones.
          </Typography>
          <Typography variant="h5" component="p" gutterBottom>
            Elija el servicio común que desea reservar.
          </Typography>
        </Container>
      </Box>

      {/* Sección de características */}
      <Container sx={{ mt: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          SERVICIOS COMUNES PARA RESERVAR
        </Typography>
        <Typography variant="body1" paragraph align="center">
          Ofrecemos una plataforma diseñada para ser fácil de usar, confiable y
          segura. Aquí están algunas razones por las que deberías elegirnos.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            mt: 4,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ width: "300px", textAlign: "center", mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Facilidad de uso
            </Typography>
            <Typography variant="body1">
              Nuestra plataforma es intuitiva y fácil de navegar, lo que te
              permite concentrarte en lo que importa.
            </Typography>
          </Box>
          <Box sx={{ width: "300px", textAlign: "center", mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Seguridad
            </Typography>
            <Typography variant="body1">
              Tomamos la seguridad de tus datos muy en serio con las mejores
              prácticas de seguridad.
            </Typography>
          </Box>
          <Box sx={{ width: "300px", textAlign: "center", mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Soporte 24/7
            </Typography>
            <Typography variant="body1">
              Nuestro equipo de soporte está disponible 24/7 para ayudarte con
              cualquier pregunta o problema.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Reservation;
