import mongoose from "mongoose";
import { number } from "zod";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        departamento: {
            type: Number,
            required: true,
            unique: true,
        },
    },
    // timestamps agrega automáticamente createdAt y updatedAt
    { timestamps: true }
);

export default mongoose.model("User", userSchema);