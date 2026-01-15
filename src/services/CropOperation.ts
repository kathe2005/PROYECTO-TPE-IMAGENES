// Importaciones de dependencias
import sharp from "sharp";
import { IImagenOperation , CropParams} from "../interfaces/IImageOperation";
import { AppError } from "../types/AppError";

// Clase de recorte 
export class CropOperation implements IImagenOperation
{
    async execute(buffer: Buffer, params:CropParams ): Promise<Buffer> 
    {
        //Convertimos y validamos los parametros 
        const left = Number(params.left); 
        const top = Number(params.top); 
        const width = Number(params.width); 
        const height = Number(params.height); 

        //Valida si son numeros
        if([left, top, width, height].some(val => isNaN(val)))
        {
            throw new AppError("Todos los parámetros de recorte deben ser números válidos", "INVALID_NUMERIC_DATA", 400); 
        }

        //Valida si estan todos los datos
        if (left === undefined || top === undefined || width === undefined || height === undefined) 
        {
            throw new AppError("Faltan parámetros obligatorios: left, top, width, height", "INVALID_NUMERIC_DATA", 400);
        }

        // Valida que no haya numeros negativos
        if (left <= 0 || top <= 0 || width <= 0 || height <= 0) 
        {
            throw new AppError("Los numeros no pueden ser negativos","INVALID_DIMENSIONS", 400);
        }

        try{
            //Ejecución 
            return await sharp(buffer).extract({ left, top, width, height}).toBuffer();
        }
        catch (error:unknown)
        {
            //Si falla
            throw new AppError('Error al procesar el reporte', 'UNKNOWN_ERROR', 400); 
        }
    }
}
