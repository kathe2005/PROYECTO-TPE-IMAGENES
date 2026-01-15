//Importaciones de dependencias
import sharp from "sharp";
import { IImagenOperation, OperationParams, FilterParams } from "../interfaces/IImageOperation";
import { AppError } from "../types/AppError";

export class FilterOperation implements IImagenOperation
{
    async execute(buffer: Buffer, params: OperationParams): Promise<Buffer> 
    {
        //Extraccion 
        const { filter }= params as unknown as FilterParams; 
        const image = sharp(buffer); 

        //Diferentes transformaciones
        const filterMissions: Record<string, () => Promise<Buffer>> = {
            'blur':      async () => await image.blur(5).toBuffer(),
            'sharpen':   async () => await image.sharpen().toBuffer(),
            'grayscale': async () => await image.grayscale().toBuffer(),
        };

        //Selección de la transformación
        const execution = filterMissions[filter];

        //Verificación de la seleccion
        if (!execution) {
            
            throw new AppError( `Filtro no soportado. Use: ${Object.keys(filterMissions).join(', ')}.`, "UNSUPPORTED_FILTER", 400);
        }

        //Ejecución de la transformación 
        return await execution();
    }
}

