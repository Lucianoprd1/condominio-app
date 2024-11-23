import mongoose from "mongoose";

const libroSchema = new mongoose.Schema(
    {
        titulo:{
            type: String,
            required: true,
            trim: true,
        },
        contenido:{
            type: String,
            required: true,
            trim: true,
        },
        fecha:{
            type: Date,
            required: true,
            trim: true,
            default: Date.now,
        }
    }

)

export default mongoose.model("Libro", libroSchema);