import express from 'express'
import empleadosController from '../controllers/empleadosController.js'

const router = express.Router()

router.route('/')
    .get(empleadosController.getEmpleados)
    .post(empleadosController.postEmpleado)

router.route('/:id')
    .put(empleadosController.putEmpleado)
    .delete(empleadosController.deleteEmpleado)

export default router