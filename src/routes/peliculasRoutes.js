import express from 'express'
import multer from 'multer'
import peliculaController from '../controllers/peliculasController.js'

const router = express.Router()

const upload =  multer({dest: 'public/'})

router.route('/')
    .get(peliculaController.getPeliculas)
    .post(upload.single('imagen'), peliculaController.postPelicula)

router.route('/:id')
    .put(upload.single('imagen'), peliculaController.putPelicula)
    .delete(peliculaController.deletePelicula)

export default router