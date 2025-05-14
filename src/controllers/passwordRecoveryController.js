import jsonwebtoken, { decode } from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Cliente from "../models/Clientes.js";
import Empleado from "../models/Empleados.js";
import { sendEmail, HTMLRecoveryEmail } from "../utils/mailPasswordRecovery.js";
import { config } from "../config.js";

const passwordRecoveryController = {};

passwordRecoveryController.requestCode = async (req, res) => {
  const { correo } = req.body;

  try {
    let userFound;
    let userType;

    userFound = await Cliente.findOne({ correo });
    if (userFound) {
      userType = "cliente";
    } else {
      userFound = await Empleado.findOne({ correo });
      userType = "empleado";
    }

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const code = Math.floor(10000 + Math.random() * 60000).toString();

    const token = jsonwebtoken.sign(
      {
        correo,
        code,
        userType,
        verificado: false
      },
      config.JWT.secret,
      { expiresIn: "25m" }
    );

    res.cookie("tokenRecoveryCode", token, { 
      maxAge: 25 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    await sendEmail(
      correo,
      "Código de recuperación de contraseña",
      `Tu código de verificación es ${code}`,
      HTMLRecoveryEmail(code)
    );

    res.json({ message: "Código de verificación enviado" });
  } catch (error) {
    console.error("Error en requestCode:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

passwordRecoveryController.verifyCode = async (req, res) => {
  const { code } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;
    if (!token) {
      return res.status(400).json({ message: "Token no encontrado" });
    }

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (decoded.code !== code) {
      return res.status(400).json({ message: "Código inválido" });
    }

    const newToken = jsonwebtoken.sign(
      {
        correo: decoded.correo,
        code: decoded.code,
        userType: decoded.userType,
        verificado: true
      },
      config.JWT.secret,
      { expiresIn: "25m" }
    );

    res.cookie("tokenRecoveryCode", newToken, { 
      maxAge: 25 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    res.json({ message: "Código verificado correctamente" });
  } catch (error) {
    console.error("Error en verifyCode:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
    res.status(500).json({ message: "Error del servidor" });
  }
};

passwordRecoveryController.newPassword = async (req, res) => {
  const { nuevaContrasenia } = req.body;

  try {
    const token = req.cookies.tokenRecoveryCode;
    if (!token) {
      return res.status(400).json({ message: "Token no encontrado" });
    }

    const decoded = jsonwebtoken.verify(token, config.JWT.secret);

    if (!decoded.verificado) {
      return res.status(400).json({ message: "Código no verificado" });
    }

    const { correo, userType } = decoded;
    const hashedPassword = await bcryptjs.hash(nuevaContrasenia, 10);

    let user;
    if (userType === "cliente") {
      user = await Cliente.findOneAndUpdate(
        { correo },
        { contrasenia: hashedPassword },
        { new: true }
      );
    } else if (userType === "empleado") {
      user = await Empleado.findOneAndUpdate(
        { correo },
        { contrasenia: hashedPassword },
        { new: true }
      );
    }

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.clearCookie("tokenRecoveryCode", {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error en newPassword:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
    res.status(500).json({ message: "Error del servidor" });
  }
};

export default passwordRecoveryController;