import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import Gasto from "../models/gastos.model.js";

// Registro de un nuevo usuario (solo administrador)
export const register = async (req, res) => {
  const { name, email, password, role, departamento } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El correo electrónico ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // Por defecto, los usuarios tendrán el rol "user"
      departamento,
    });

    await newUser.save();
    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: { name, email, role, departamento },
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Inicio de sesión
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por correo
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Enviar el token en una cookie HTTP-only
    res.cookie("token", token, { httpOnly: true, secure: false });
    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Verificar token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

// Cierre de sesión
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "Cierre de sesión exitoso" });
  } catch (error) {
    console.error("Error en el cierre de sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminar un usuario (solo administrador)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener información de todos los residentes
export const getResidents = async (req, res) => {
  try {
    // Consultar a todos los residentes
    const residents = await User.find({}, { password: 0, __v: 0 }); // Excluir contraseña y __v

    if (!residents || residents.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron residentes registrados" });
    }

    // Retornar la información de los residentes
    res.status(200).json({
      message: "Información de los residentes obtenida con éxito",
      residents,
    });
  } catch (error) {
    console.error("Error al obtener la información de los residentes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Obtener los gastos de un residente
export const getResidentExpenses = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar si el ID es válido
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "ID de usuario inválido o faltante" });
    }

    // Verificar si el usuario autenticado es administrador
    if (req.userRole !== "admin") {
      return res.status(403).json({
        message:
          "Acceso denegado: solo un administrador puede obtener esta información",
      });
    }

    // Obtener la información básica del residente
    const resident = await User.findById(id, { name: 1, department: 1 });
    if (!resident) {
      return res.status(404).json({ message: "Residente no encontrado" });
    }

    // Obtener los gastos del residente
    const gastos = await Gasto.find({ userId: id }, { monto: 1, morosidad: 1 });

    // Calcular el monto total de morosidad
    const montoMorosidad = gastos
      .filter((gasto) => gasto.morosidad)
      .reduce((total, gasto) => total + gasto.monto, 0);

    // Responder con la información completa
    res.status(200).json({
      message: "Información del residente obtenida con éxito",
      resident: {
        name: resident.name,
        department: resident.department,
        gastos: gastos.map((gasto) => ({
          monto: gasto.monto,
          morosidad: gasto.morosidad,
        })),
        montoMorosidad, // Total de morosidad
      },
    });
  } catch (error) {
    console.error("Error al obtener la información del residente:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
