import sharp from 'sharp'; 
import { IImagenOperation, ResizeParams} from '../interfaces/IImageOperation';
import { AppError } from '../types/AppError';

export class ResizeOperation implements IImagenOperation
{
    async execute(buffer: Buffer, params: ResizeParams): Promise <Buffer> 
    {
        //Convierten y valida tipos
        const width = Number(params.width); 
        const height = Number(params.height); 


        //Sin son numeros 
        if (isNaN(width) || isNaN (height))
        {
            throw new AppError("El ancho y el alto deben ser valores numéricos", "INVALID_RESIZE_FORMAT", 400); 
        }

        //Si son negativos
        if( width <= 0 || height <=0 )
        {
            throw new AppError("El ancho y el alto deben ser números positivos válidos", "INVALID_RESIZE_DIMENSIONS", 400); 
        }

        try{

            //Emplear la trnasformación 
            return await sharp(buffer).resize(width, height).toBuffer(); 
        }
        catch (error)
        {
            //Aplicar error 
            throw new AppError('Error al redimensionar imagen', 'RESIZE_PROCESSING_ERROR', 400); 
        }




    }
}