//Importacion de interfaces
import { IImageHandler, ImageRequest, ImageResponse } from "../interfaces/IImageHandler";
import { ILogger } from "../logging/ILogger";

//Clase de registro
export class LoggingDecorator implements IImageHandler
{
    constructor 
    ( 
        private inner: IImageHandler,
        private logger: ILogger
    ){}

    async handle(request: ImageRequest): Promise<ImageResponse> 
    {
        //Inicia con tiempo cronometrado
        const start = Date.now();  
        const userEmail = request.req.user?.email || 'Anonimo'; 

        
        try
        {
            //Ejecucion
            const result = await this.inner.handle(request);

            //Registro de exito
            await this.logger.log
            (
                {
                    timestamp: new Date().toISOString(),
                    level: 'info', 
                    user: userEmail, 
                    endpoint: request.req.originalUrl, 
                    params: request.req.body, 
                    duration: Date.now() - start, 
                    result: 'success'
                }
            ); 

            return result; 
        }
        catch (error: unknown)
        {
            //Manejo de errores 
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido'; 

            await this.logger.log
            (
                {
                    timestamp: new Date().toISOString(),
                    level: 'error',
                    user: userEmail, 
                    endpoint: request.req.originalUrl, 
                    params: request.req.body, 
                    duration: Date.now() - start, 
                    result: 'error', 
                    message: errorMessage
                }
            ); 

            throw error; 
        }
    }
}