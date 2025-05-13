import Employee from "../models/Empleados.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerEmployeesController = {};

registerEmployeesController.register = async (req, res) => {
  const {
       nombre,
      correo,
      contrasenia,
      telefono,
      direccion,
      puesto,
      fecha_contratacion,
      salario,
      activo
  } = req.body;

  try {
    const existEmployee = await Employee.findOne({ correo  });
    if (existEmployee) {
      return res.json({ message: "Employee already exists" });
    }

    const passwordHash = await bcryptjs.hash(contrasenia, 10);

    const newEmployee = new Employee({
      nombre,
      correo,
      contrasenia: passwordHash,
      telefono,
      direccion,
      puesto,
      fecha_contratacion,
      salario,
      activo: activo || false
    });

    await newEmployee.save();

    jsonwebtoken.sign(
      { id: newEmployee._id },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn },
      (error, token) => {
        if (error) console.log(error);
        res.cookie("authToken", token);
        res.json({ message: "Empleado registrado" });
      }
    );
  } catch (error) {
    console.log(error);
    res.json({ message: "Error al registrar empleado " + error});
  }
};

export default registerEmployeesController;
