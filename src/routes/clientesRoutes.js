import express from 'express'
import clientesController from '../controllers/clientesController.js'

const router = express.Router()

router.route('/')
    .get(clientesController.getClientes)
    .post(clientesController.postCliente)

router.route('/:id')
    .put(clientesController.putCliente)
    .delete(clientesController.deleteCliente)

export default router