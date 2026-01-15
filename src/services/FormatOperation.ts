// Importación de dependencias 
import sharp from "sharp";
import { IImagenOperation, FormatParams, OperationParams } from "../interfaces/IImageOperation";
import { AppError } from "../types/AppError";

// Clase de cambio de formato
export class FormatOperation implements IImagenOperation
{
    async execute(buffer: Buffer, params: OperationParams): Promise<Buffer> 
    {
        //Extracción de Configuración
        const config = params as unknown as FormatParams; 

        // Validación 
        if(!config.format)
        {
            throw new AppError("El parámetro 'format' es obligatorio para esta operación", "MISSING_FORMAT_PARAMETER", 400);
        }

        //Lista de formatos
        const allowedFormats = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff']; 

        if(!allowedFormats.includes(config.format))
        {
            throw new AppError(`Fomato ${config.format} no soportado. Use: jpeg, jpg, png, webp, avif, tiff`, "UNSUPPORTED_FORMAT", 400); 
        }

        try
        {
            // Aplicar las transformaciones
            return await sharp(buffer).toFormat(config.format).toBuffer();
        }
        catch (error: unknown)
        {
            //Aplicar el error 
            throw new AppError("Error tecnico al convertir el formato de la imagen", "CONVERSION_ERROR", 400); 
        }
    }
}