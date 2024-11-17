import mongoose from 'mongoose'; // Importa mongoose para la conexión
import User from './models/user.model.js'; // Modelo User
import bcrypt from 'bcryptjs'; // Para encriptar contraseñas

// Función para crear un usuario administrador
const createAdminUser = async () => {
    try {
        // Verificar si el usuario administrador ya existe
        const adminExists = await User.findOne({ email: 'admin@example.com' });
        if (adminExists) {
            console.log('Admin user already exists');
            return;
        }

        // Crear y guardar el usuario administrador
        const hashedPassword = await bcrypt.hash('adminpassword123', 10); // Contraseña encriptada
        const adminUser = new User({
            name: 'Administrator',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin',
        });

        await adminUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

// Función para conectar a la base de datos
const connectDB = async () => {
    try {
        // Conexión a MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB is connected');

        // Crear el usuario administrador después de conectar a la base de datos
        await createAdminUser();
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Salir del proceso si no se conecta correctamente
    }
};

export default connectDB;