import mongoose from 'mongoose';

const gastoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    utilidades: {
        type: Number,
        required: true,
    },
    mantencion: {
        type: Number,
        required: true,
    },
    otros: {
        type: Number,
        required: true,
    },
    mes: {
        type: String,
        required: true,
    },
    estadoPago: {
        type: String,
        default: 'pendiente',
        enum: ['pendiente', 'pagado'], // Solo puede ser 'pendiente' o 'pagado'
    },
    fechaPago: {
        type: Date, // Solo se asigna cuando se registra el pago
    },
    fechaRegistro: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Gasto', gastoSchema);