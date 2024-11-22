import mongoose from "mongoose"; // Importa mongoose para la conexión
import User from "./models/user.model.js"; // Modelo User
import bcrypt from "bcryptjs"; // Para encriptar contraseñas

// Función para crear un usuario administrador
const createAdminUser = async () => {
  try {
    // Verificar si el usuario administrador ya existe
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (adminExists) {
      console.log("El usuario admin ya existe");
      return;
    }

    // Crear y guardar el usuario administrador
    const hashedPassword = await bcrypt.hash("adminpassword123", 10); // Contraseña encriptada
    const adminUser = new User({
      name: "Administrator",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("El usuario Admin ha sido creado con éxito");
  } catch (error) {
    console.error("Error al crear al usuario admin:", error);
  }
};

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    // Conexión a MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      //useNewUrlParser: true, // Función depreciada por NodeJS
      //useUnifiedTopology: true, // Función depreciada por NodeJS
    });
    console.log("MongoDB está conectado.");

    // Crear el usuario administrador después de conectar a la base de datos
    await createAdminUser();
  } catch (error) {
    console.error("Error de conección con MongoDB:", error);
    process.exit(1); // Salir del proceso si no se conecta correctamente
  }
};

export default connectDB;
