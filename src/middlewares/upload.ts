import multer from 'multer'; 

const storage = multer.memoryStorage(); //Guardar en memoria 

export const upload = multer 
(
    {
        storage,
        limits: { fileSize: 10 * 1024 * 1024 }, // Límite 10MB
    }

).single('image');

// Manejar el error 413
export const handleUploadError = (err: any, req: any, res: any, next: any) => 
{
    if ( err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE')
    {
        return res.status(413).json
        (
            {
                success: false, 
                message: "⚠️ El archivo es demasiado pesado para el búnker (Máx 10MB)."
            }
        ); 

    }

    next (err); 
}; 
