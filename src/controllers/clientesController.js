const clientesController = {}

import Cliente from '../models/Clientes.js'

clientesController.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find()
        res.json(clientes)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

clientesController.postCliente = async (req, res) => {
    const { nombre, correo, contrasenia, telefono, direccion, activo } = req.body
    const nuevoCliente = new Cliente({ nombre, correo, contrasenia, telefono, direccion, activo })
    try {
        const clienteGuardado = await nuevoCliente.save()
        res.status(201).json(clienteGuardado)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

clientesController.putCliente = async (req, res) => {
    const { id } = req.params
    const { nombre, correo, contrasenia, telefono, direccion, activo } = req.body
    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(id, { nombre, correo, contrasenia, telefono, direccion, activo }, { new: true })
        if (!clienteActualizado) {
            return res.status(404).json({ message: 'Cliente no encontrado' })
        }
        res.json(clienteActualizado)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

clientesController.deleteCliente = async (req, res) => {
    const { id } = req.params
    try {
        const clienteEliminado = await Cliente.findByIdAndDelete(id)
        if (!clienteEliminado) {
            return res.status(404).json({ message: 'Cliente no encontrado' })
        }
        res.json({ message: 'Cliente eliminado' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default clientesController