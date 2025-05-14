import nodemailer from "nodemailer";
import { config } from "../config.js";

// 1- Configurar el transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.email.email_user,
    pass: config.email.email_pass,
  },
});

// 2- Enviar el correo
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Cinemark" <luisesc1210@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    console.log("Error sending email");
    throw error; // Es mejor lanzar el error para manejarlo en el controlador
  }
};

// 3- Funcion para generar el HTML con tema de cine
const HTMLRecoveryEmail = (code) => {
  return `
    <div style="font-family: Arial, sans-serif; text-align: center; background-color: #000; padding: 20px; border: 2px solid #d32f2f; border-radius: 5px; max-width: 600px; margin: 0 auto; color: #fff;">
      <div style="background-color: #d32f2f; padding: 15px; border-radius: 5px 5px 0 0; margin: -20px -20px 20px -20px;">
        <h1 style="color: #fff; font-size: 28px; margin: 0; letter-spacing: 1px;">CINEMARK</h1>
      </div>
      
      <h2 style="color: #d32f2f; font-size: 22px; margin-bottom: 20px;">Recuperación de Contraseña</h2>
      
      <p style="font-size: 16px; color: #ddd; line-height: 1.5; margin-bottom: 25px;">
        Hemos recibido una solicitud para restablecer tu contraseña. Utiliza el siguiente código de verificación:
      </p>
      
      <div style="display: inline-block; padding: 15px 30px; margin: 20px 0; font-size: 24px; font-weight: bold; color: #fff; background-color: #d32f2f; border-radius: 5px; border: 1px solid #b71c1c; letter-spacing: 2px;">
        ${code}
      </div>
      
      <p style="font-size: 14px; color: #aaa; line-height: 1.5; margin-bottom: 25px;">
        Este código es válido por <strong>25 minutos</strong>. Si no solicitaste este correo, puedes ignorarlo.
      </p>
      
      <div style="border-top: 1px solid #333; padding-top: 20px; margin-top: 20px;">
        <p style="font-size: 12px; color: #777;">
          ¿Necesitas ayuda? Contáctanos en 
          <a href="mailto:soporte@cinemark.com" style="color: #d32f2f; text-decoration: none;">soporte@cinemark.com</a>
        </p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Cinemark_logo.svg/1200px-Cinemark_logo.svg.png" alt="Cinemark Logo" style="width: 120px; margin-top: 15px; opacity: 0.8;">
      </div>
    </div>
  `;
};

export { sendEmail, HTMLRecoveryEmail };