import mongoose from "mongoose";

const publicacionSchema = new mongoose.Schema(
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

export default mongoose.model("Publicacion", publicacionSchema);