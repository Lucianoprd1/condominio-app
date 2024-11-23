import mongoose from 'mongoose';

const multaSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    montoMulta: {
        type: Number,
        required: true,
    },
    descripcion: {
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

export default mongoose.model('Multa', multaSchema);