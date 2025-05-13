import {Schema, model} from 'mongoose'


const EmpleadoSchema = new Schema({
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
    puesto: {
        type: String,
        required: true,
        trim: true,
        enum: ['Gerente', 'Asistente', 'Vendedor']
    },
    fecha_contratacion: {
        type: Date,
        required: true
    },
    salario: {
        type: Number,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    strict: true
});

export default model('Empleado', EmpleadoSchema);