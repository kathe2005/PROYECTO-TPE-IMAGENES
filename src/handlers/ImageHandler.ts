//Importacion de interfaces (dependencias)
import { ImagenService } from "../services/ImagenService";
import { IImageHandler, ImageRequest, ImageResponse } from "../interfaces/IImageHandler";
import { OperationParams } from "../interfaces/IImageOperation";
import { AppError } from "../types/AppError";
export class ImageHandler implements IImageHandler
{
    //Inyectamos en el constructor 
    constructor (private factory: ImagenService) {}

    async handle(request: ImageRequest): Promise<ImageResponse> 
    {
        //Desestructuramos para acceder fácil a los objetos de Express y al tipo de operación 
        const { req, res, operationType } = request;  

        try
        {
            //Error 400: Parámetros inválidos o faltantes
            if ( !req.file )
            {
                throw new AppError(" Campo 'image' es requerido",  "MISSING_IMAGE", 400);

            }

            //Identificar la operación que tiene la ruta
            const finalOp = operationType || ( req.query.op as string ) || 'resize'; 



            //Obtener operación de factory
            const operation = this.factory.getOperation(finalOp); 



            //Ejecutar 
            const params = req.body as OperationParams; 
            const processedBuffer = await operation.execute(req.file.buffer, params); 


            //Respuesta Existosa
            res.status(200).set(
                {
                    "Content-Type" : req.file.mimetype, 
                    "Content-Disposition": `attachment; filename="processed-${operationType}.png"`, 
                    "Content-Length": processedBuffer.length.toString()
                }
            ); 

            res.end(processedBuffer); //Envia los bytes

            return {success: true}; 


        }
        catch ( error: unknown )
        {
            // Inicializamos valores por defecto 
            let statusCode = 500;
            let errorMessage = "Error interno del servidor";
            let errorCode = "INTERNAL_SERVER_ERROR";

            //Verificamos si es un AppError (Clase personalizada)
            if (error instanceof AppError) 
            {
                statusCode = error.statusCode;
                errorMessage = error.message;
                errorCode = error.errorCode;
            } 
            else if (error instanceof Error) 
            {
                errorMessage = error.message;
        
                //  Lógica de búsqueda de palabras clave de forma segura
                const msgLower = errorMessage.toLowerCase();
                if (msgLower.includes("filtro no soportado") || msgLower.includes("missing"))
                {
                    statusCode = 400;
                    errorCode = "BAD_REQUEST";
                }
            }

            //Mensaje de error 
            res.status(statusCode).json({
                error: errorMessage,
                code: errorCode,
                timestamp: new Date().toISOString()
            });

            return { success: false };
        }
    }
}