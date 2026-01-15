import sharp from "sharp";
import { IImagenOperation, OperationParams, RotateParams } from "../interfaces/IImageOperation";
import { AppError } from "../types/AppError";

export class RotateOperation implements IImagenOperation
{
    async execute(buffer: Buffer, params: OperationParams): Promise<Buffer> 
    {
        const rotateConfig = params as unknown as RotateParams; 

        const angle = Number(rotateConfig.angle); 

        //validar si es un numero
        if (isNaN(angle))
        {
            throw new AppError("El parametro angle es obligatorio y debe ser un numero", "MISSING_OR_INVALID_ANGLE", 400); 
        }

        //Validar los angulos permitidos 
        if(![90, 180, 270].includes(angle))
        {
            throw new AppError("El ángulo debe ser 90, 180 o 270 grados.", "INVALID_ROTATION_ANGLE",400);
        }

        try
        {
            //Emplear la transformación 
            return await sharp(buffer).rotate(angle).toBuffer();
        }
        catch (error: unknown)
        {
            //Aplicar el error 
            throw new AppError("Error al intentar rotar la imagen", "ROTATION_PROCESSING_ERROR", 400); 
        }
        
    }

}