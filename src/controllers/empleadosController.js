const empleadosController = {}

import Empleado from '../models/Empleados.js'

empleadosController.getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.find()
        res.json(empleados)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

empleadosController.postEmpleado = async (req, res) => {
    const { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, activo } = req.body
    const nuevoEmpleado = new Empleado({ nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, activo })
    try {
        const empleadoGuardado = await nuevoEmpleado.save()
        res.status(201).json(empleadoGuardado)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

empleadosController.putEmpleado = async (req, res) => {
    const { id } = req.params
    const { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, activo } = req.body
    try {
        const empleadoActualizado = await Empleado.findByIdAndUpdate(id, { nombre, correo, contrasenia, telefono, direccion, puesto, fecha_contratacion, salario, activo }, { new: true })
        if (!empleadoActualizado) {
            return res.status(404).json({ message: 'Empleado no encontrado' })
        }
        res.json(empleadoActualizado)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

empleadosController.deleteEmpleado = async (req, res) => {
    const { id } = req.params
    try {
        const empleadoEliminado = await Empleado.findByIdAndDelete(id)
        if (!empleadoEliminado) {
            return res.status(404).json({ message: 'Empleado no encontrado' })
        }
        res.json({ message: 'Empleado eliminado' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default empleadosController