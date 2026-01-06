import { Router } from "express";
import { upload, handleUploadError } from "../middlewares/upload";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ImageHandler } from "../handlers/ImageHandler";

const router = Router(); 

/**
 * 📸 RUTA DE PROCESAMIENTO DE IMÁGENES
 * POST /api/images/process
 * * Orden de Operación:
 * authMiddleware: Verifica el Token JWT.
 * upload: Procesa el archivo 'image' con Multer (Máx 10MB).
 * handleUploadError: Intercepta si el archivo es demasiado pesado (Error 413).
 * ImageHandler.process: Ejecuta Sharp y devuelve el binario.
 */

router.post(
    '/process',
    authMiddleware,                //🛡️ Seguridad primero
    upload,                        //📦 Recepción del paquete
    handleUploadError,             //⚠️ Validación de peso
    ImageHandler.process           //🛠️ Transformación final
); 

export default router; 