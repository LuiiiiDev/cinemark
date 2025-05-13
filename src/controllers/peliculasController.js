const peliculaController = {}

import Pelicula from '../models/Peliculas.js'
import {v2 as cloudinary} from 'cloudinary'
import {config} from "../config.js"

cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_api_key,
  api_secret: config.cloudinary.cloudinary_api_secret
})

peliculaController.getPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.find()
        res.json(peliculas)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

peliculaController.postPelicula = async (req, res) => {
    try {
        const { titulo, descripcion, director, genero, anio, duracion } = req.body
        let imagenUrl = ""
        
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'peliculas',
                allowed_formats: ['jpg', 'png', 'jpeg']
            })
            imagenUrl = result.secure_url
        }

        const nuevaPelicula = new Pelicula({ 
            titulo, 
            descripcion, 
            director, 
            genero, 
            anio, 
            duracion, 
            imagen: imagenUrl 
        })

        await nuevaPelicula.save()
        res.status(201).json({ message: 'Película creada', pelicula: nuevaPelicula })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

peliculaController.putPelicula = async (req, res) => {
    try {
        const { id } = req.params
        const { titulo, descripcion, director, genero, anio, duracion } = req.body
        
        const updateData = { titulo, descripcion, director, genero, anio, duracion }
        
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'peliculas',
                allowed_formats: ['jpg', 'png', 'jpeg']
            })
            updateData.imagen = result.secure_url
            
        }

        const peliculaActualizada = await Pelicula.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true }
        )

        if (!peliculaActualizada) {
            return res.status(404).json({ message: 'Película no encontrada' })
        }

        res.json({ message: 'Película actualizada', pelicula: peliculaActualizada })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

peliculaController.deletePelicula = async (req, res) => {
    try {
        const { id } = req.params
        const peliculaEliminada = await Pelicula.findByIdAndDelete(id)
        
        if (!peliculaEliminada) {
            return res.status(404).json({ message: 'Película no encontrada' })
        }
        
        
        res.json({ message: 'Película eliminada' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default peliculaController