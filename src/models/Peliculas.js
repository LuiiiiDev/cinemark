import {Schema, model} from 'mongoose'

const PeliculaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true

    },
    director: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true,
        enum: ['Accion', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficcion', 'Romance']
    },
    anio: {
        type: Number,
        required: true
    },
    duracion: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    strict: true
})

export default model('Pelicula', PeliculaSchema)