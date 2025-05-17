import clientesModelo from "../models/Clientes.js"
import empleadosModelo from "../models/Empleados.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../config.js"


const loginController = {};

loginController.login = async (req, res) => {
    const { correo, contrasenia } = req.body;

    try {

        let userFound;
        let userType;

        if (correo === config.emailAdmin.email && contrasenia === config.emailAdmin.password) {
            userType = "admin";
            userFound = { _id: "admin" }
        } else {
            userFound = await empleadosModelo.findOne({ correo });
            userType = "empleado"
            if (!userFound) {
                userFound = await clientesModelo.findOne({ correo });
                userType = "cliente"
            }
        }
        if (!userFound) {
            return res.json({ message: "User not found" });
        }

      

        if (userType !== "admin") {
            const isMatch = await bcryptjs.compare(contrasenia, userFound.contrasenia);
            if (!isMatch) {
                return res.json({ message: "Invalid password" })
            }
        }


        //TOKEN
        jsonwebtoken.sign(
            //1 que voy a guardar
            { id: userFound._id, userType },
            //2- secreto
            config.JWT.secret,
            //3- Cuando expira
            { expiresIn: config.JWT.expiresIn },
            //4- Funcion flecha
            (error, token) => {
                if (error) console.log("error" + error)

                res.cookie("authToken", token)
                res.json({ message: "Login successful" })
            } 
        )

    } catch (error) {
        console.log("error" + error)
        res.json({ message: "Error login" })
    }
};


export default loginController;