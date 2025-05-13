import { Schema, model } from 'mongoose';

const ClienteSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    strict: true
});

export default model('Cliente', ClienteSchema);