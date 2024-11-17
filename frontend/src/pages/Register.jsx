import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Button, TextField } from "@mui/material";
import BgIMG from "../assets/background.png";
import LogoIMG from "../assets/logo-sgc.png";

// Crea un tema personalizado utilizando Material UI.
const theme = createTheme({
  palette: {
    primary: {
      main: "#173A5E", // Color principal de la aplicación (azul oscuro).
    },
    background: {
      paper: "#fff", // Define el color de fondo "paper" que será usado para elementos como cajas o tarjetas (blanco).
    },
    text: {
      primary: "#173A5E", // Color primario del texto (azul oscuro).
      secondary: "#173A5E", // Color secundario del texto (gris azulado).
    },
    action: {
      active: "#001E3C", // Color para los elementos activos, como botones o enlaces (azul oscuro).
    },
    success: {
      main: "#009688", // Color que representa el estado de éxito (verde oscuro).
    },
  },
});

// Componente de función que representa la página de registro (Register).
export default function Register() {
  const navigate = useNavigate(); // Para redirigir a otras páginas.
  const [error, setError] = React.useState(""); // Para manejar errores.
  const [success, setSuccess] = React.useState(""); // Para manejar el mensaje de éxito.

  // Función que maneja el envío del formulario.
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que el comportamiento de recargar la página al enviar el formulario.
    const data = new FormData(event.currentTarget); // Obtiene los datos del formulario.
    const user = data.get("user"); // Obtiene el valor del campo "user".
    const email = data.get("email"); // Obtiene el valor del campo "email".
    const password = data.get("password"); // Obtiene el valor del campo "password".
    console.log({ email, password }); // Para depurar. ELIMINAR!

    // Validación para verificar que los campos no estén vacíos
    if (!user || !email || !password) {
      setError("Por favor, complete todos los campos.");
      setSuccess("");
      return;
    }

    // Recupera los usuarios existentes en LocalStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verifica si el usuario ya existe (basado en el email)
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      setError("Ya existe una cuenta con este correo.");
      setSuccess("");
      return;
    }

    // Si no existe, agrega el nuevo usuario al arreglo y lo guarda en LocalStorage
    const newUser = { user, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Muestra un mensaje de éxito
    setSuccess("Registro exitoso. Vamos al login...");
    setError("");

    // Redirige al Login después de 2 segundos
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    // ThemeProvider aplica el tema definido más arriba a todos los componentes dentro de él.
    <ThemeProvider theme={theme}>
      {/* Contenedor principal que ocupa toda la altura de la ventana y tiene una imagen de fondo */}
      <Box
        sx={{
          display: "flex", // Usa flexbox para alinear los elementos hijos.
          justifyContent: "center", // Centra el contenido horizontalmente.
          alignItems: "center", // Centra el contenido verticalmente.
          height: "100vh", // El contenedor ocupa toda la altura visible de la ventana del navegador.
          backgroundImage: `url(${BgIMG})`, // Imagen de fondo.
          backgroundSize: "cover", // La imagen de fondo cubre toda el área del contenedor sin perder la proporción.
          backgroundPosition: "center", // La imagen está centrada dentro del contenedor.
          backgroundRepeat: "no-repeat", // Evita que la imagen se repita si es más pequeña que el contenedor.
        }}
      >
        {/* Caja interior central que contiene los elementos del Registro. */}
        <Box
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.8)", // Fondo blanco semitransparente con opacidad 80%
            boxShadow: 1, // Aplica una sombra ligera a la caja para darle un efecto elevado.
            borderRadius: 3, // Bordes redondeados.
            paddingTop: 1, // Padding superior.
            paddingBottom: 2, // Padding inferior.
            paddingLeft: 5, // Padding izquierdo.
            paddingRight: 5, // Padding derecho.
            minWidth: 400, // Ancho mínimo de la caja.
            minHeight: 700, // Altura mínima de la caja.
            position: "relative", // Los elementos hijos con posición absoluta se ajustan a este contenedor.
          }}
        >
          {/* Caja para el logo. */}
          <Box
            sx={{
              width: 200, // Ancho fijo del Box
              height: 200, // Altura fija, igual al ancho para que sea un círculo
              boxShadow: 0, // 1: Sombra ligera  |  0: Sin sombra
              borderRadius: "50%", // Círculo perfecto
              overflow: "hidden", // Oculta cualquier parte que sobresalga de la imagen
              margin: "0 auto", // Asegura que el logo se centre dentro del contenedor principal.
              p: 0, // Padding interno.
              marginTop: 0,
              marginBottom: 2,
            }}
          >
            <img
              src={LogoIMG}
              alt="Logo S.G.C." // Texto alternativo para accesibilidad.
              style={{
                width: "100%", // Imagen ocupa todo el ancho del Box
                height: "100%", // Imagen ocupa todo el alto del Box
                objectFit: "cover", // Mantiene la proporción de la imagen
              }}
            />
          </Box>

          {/* Caja para el Título. */}
          <Box
            sx={{
              width: 300, // Ancho fijo del Box.
              height: 100, // Altura fija del Box.
              textAlign: "center", // Texto centrado.
              color: "primary.main", // Color principal de la paleta.
              fontSize: "h5.fontSize", // Tamaño de fuente h4.
              fontWeight: "bold", // Fuente en negrita.
              margin: "0 auto", // Centra el Box horizontalmente
            }}
          >
            Registro
          </Box>

          {/* Caja para el formulario del Registro. */}
          <Box
            component="form"
            onSubmit={handleSubmit} // Maneja el envío del formulario
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2, // Espacio entre los elementos
              p: 0, // Padding interno
              bgcolor: "rgba(255, 255, 255, 0)", // Fondo blanco semitransparente
              borderRadius: 2, // Bordes redondeados
              boxShadow: 0, // Sombra ligera.
              minWidth: 300, // Ancho mínimo del formulario
            }}
          >
            {/* Campo Nombre de usuario. */}
            <TextField
              required
              id="user"
              name="user"
              label="Nombre y Apellido"
              type="user"
              variant="filled"
              fullWidth
              sx={{
                bgcolor: "white", // Fondo blanco para el campo de texto.
                boxShadow: 1, // Sombra ligera.
                fontWeight: "bold",
              }}
              autoComplete="off" // Habilita el autocompletado de campos de formulario
            />
            {/* Campo de correo electrónico */}
            <TextField
              required
              id="email"
              name="email"
              label="Correo"
              type="email"
              variant="filled"
              fullWidth
              sx={{
                bgcolor: "white", // Fondo blanco para el campo de texto.
                boxShadow: 1, // Sombra ligera.
                fontWeight: "bold",
              }}
              autoComplete="off" // Habilita el autocompletado de campos de formulario
            />

            {/* Campo de contraseña */}
            <TextField
              required
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              variant="filled"
              fullWidth
              sx={{
                bgcolor: "white", // Fondo blanco para el campo de texto.
                boxShadow: 1, // Sombra ligera.
                fontWeight: "bold",
              }}
              autoComplete="off" // Habilita el autocompletado de campos de formulario
            />
            {/* Mostrar mensaje de error si existe */}
            {error && (
              <Box sx={{ color: "red", fontWeight: "bold", marginTop: 2 }}>
                {error}
              </Box>
            )}

            {/* Mostrar mensaje de éxito si existe */}
            {success && (
              <Box sx={{ color: "green", fontWeight: "bold", marginTop: 2 }}>
                {success}
              </Box>
            )}
            {/* Botón para enviar el formulario */}
            <Button
              type="submit" // Tipo de botón para enviar el formulario
              variant="contained" // Estilo de botón con fondo de color
              color="primary" // Color principal del botón
              sx={{
                mt: 3, // Margen superior de 2 unidades (1 unidad = 8px)
                width: "100%", // Ancho del botón al 100% del formulario
                height: "50px", // Altura del botón
                fontWeight: "bold", // Negrita
                boxShadow: 10, // Sombra más pronunciada
              }}
            >
              Registrarse
            </Button>
          </Box>
          {/* Caja para volver al login. */}
          <Box
            sx={{
              mt: 4, // Margen superior de 4 unidades
              paddingBottom: 3, // Padding inferior de 3 unidades
              width: "100%",
              textAlign: "center",
              color: "text.primary",
              fontSize: "16px",
              fontWeight: "bold", // Negrita
            }}
          >
            ¿Ya tiene cuenta?{" "}
            <Link to="/login" style={{ color: "#009688" }}>
              Acceda aquí.
            </Link>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
