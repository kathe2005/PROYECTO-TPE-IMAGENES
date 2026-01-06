import { Request, Response } from "express";
import { OperationFactory } from "../services/OperationFactory";

export class ImageHandler
{
    static async process(req: Request, res: Response)
    {
        try
        {

            //Verificación de seguridad
            if ( !req.file )
            {
                return res.status(400).json
                ({
                    success: false, 
                    message: "🚫 Error: No se ha recibido ninguna imagen para procesar."
                }); 
            }

             //Identificar
            const operationType = ( req.query.op as string ) || 'resize'; 

            //Solicitar la herramienta a Factory 
            const operation = OperationFactory.getOperation(operationType);

            //Ejecutar la transformación
            const processedBuffer = await operation.execute(req.file.buffer); 

            //Configurar el archivo (Content-Type)
            res.set('Content-Type', req.file.mimetype); 

            //Enviar 
            res.send(processedBuffer); 
        }
        catch (error: any)
        {
            // Manejo de fallos en la operación 
            res.status(400).json
            (
                {
                    success: false, 
                    message: `❌ Fallo en la operación: ${error.message}`
                }
            ); 
        }
    }
}