import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import React from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainRoutes from "./routes/MainRoutes";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Estilos globales de Material-UI */}
      {/* <Navbar /> */}
      <MainRoutes /> {/* Rutas de la aplicación */}
      {/* <Footer /> */}
    </ThemeProvider>
  );
}

export default App;