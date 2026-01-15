
//Importacion de dependencias
import { IImageHandler, ImageRequest, ImageResponse } from "../interfaces/IImageHandler";
import { ImagenService } from "../services/ImagenService";
import sharp from "sharp";
import { AppError } from "../types/AppError";

export class PipelineHandler implements IImageHandler
{
    //Inyeccion de factory para obtener las herramientas 
    constructor(private  factory: ImagenService){}

    public async handle(request: ImageRequest): Promise<ImageResponse> 
    {

        try{

            //Validacion de la imagen
            if(!request.req.file)
            {
                throw new AppError("Campo 'image' es requerido", "MISSING_IMAGE", 400);

            }

            //Decodificacion de las operaciones 
            let rawOperations = request.req.body.operations;

            const finalOperations = typeof rawOperations === 'string' 
                ? JSON.parse(rawOperations)
                :rawOperations;


            //Validamos que sea un array 
            const operations = Array.isArray(finalOperations) ? finalOperations : finalOperations.operations; 

            if(!operations || !Array.isArray(operations))
            {
                throw new AppError("Se requiere un array de operaciones", "INVALID_PIPELINE", 400);

            }

            //Iniciamos el procesamiento con Sharp
            let imageProcessor = sharp(request.req.file.buffer);

            //Aplicamos cada transformacion secuencialmente
            for (const op of operations)
            {
                //Obtenemos la herramienta especifica del factory
                const operationTool = this.factory.getOperation(op.type);

                //Ejecuta la transformación y genera un nuevo buffer 
                const processedBuffer = await operationTool.execute(await imageProcessor.toBuffer(), op.params);

                //Creacion la cadena 
                imageProcessor = sharp(processedBuffer);
            }

            //Genera el producto final
            const finalBuffer = await imageProcessor.toBuffer();

            //Respuesta Existosa
            request.res.status(200).set({
                "Content-Type": "image/webp", 
                "Content-Disposition": 'attachment; filename="pipeline-result.webp"',
                "Content-Length": finalBuffer.length.toString()
            }); 

            request.res.send(finalBuffer); 

            return {success: true}; 
        }
        catch (error)
        {
            //Error sin el array 
            throw new AppError("Se requiere un array de operaciones", "INVALID_PIPELINE", 400);
        }
        
    }
}