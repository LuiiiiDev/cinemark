import express from "express";
import passwordRecoveryController from "../controllers/passwordRecoveryController.js";

const router = express.Router();

router.post("/solicitar-codigo", passwordRecoveryController.requestCode);

router.post("/verificar-codigo", passwordRecoveryController.verifyCode);

router.post("/nueva-contrasena", passwordRecoveryController.newPassword);

export default router;