
//Importaciones de dependencias
import multer from 'multer'; 
import { Request, Response, NextFunction } from 'express'; 
import { AppError } from '../types/AppError';

const storage = multer.memoryStorage(); //Guarda en memoria 

export const upload = multer 
(
    {
        storage,
        limits: 
        { 
            fileSize: 10 * 1024 * 1024 //Limite 10MB
        }, 
        fileFilter: (req, file, cb) => {

            //Formatos soportados 
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/avif', 'image/tiff' ]; 

            if(allowedTypes.includes(file.mimetype))
            {
                cb(null, true); 
            }
            else
            {
                cb(new Error('FORMATO_NO_SOPORTADO'));
            }
        }
    }

);

// Manejar el error 413 (Archivos muy grandes), 415 (Formato de imagen no soportado) y 500 (Error interno del servidor)
export const handleUploadError = (err: unknown, req: Request, res: Response, next: NextFunction) => 
{
    if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') {
        return next(new AppError("El archivo es demasiado pesado (Máximo 10MB)", "FILE_TOO_LARGE", 413));
    }

    if (err instanceof Error && err.message === 'FORMATO_NO_SOPORTADO') 
    {
        return next(new AppError("El formato de imagen no está permitido por el búnker", "UNSUPPORTED_MEDIA_TYPE", 415));
    }


    if (err instanceof AppError) 
    {
        return next(err);
    }

    
    next(new AppError("Error inesperado al subir el archivo", "INTERNAL_SERVER_ERROR", 500));
}; 
