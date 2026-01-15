import { Router, Request, Response, NextFunction } from "express";
import { upload, handleUploadError } from "../middlewares/upload";
import { ImageHandler } from "../handlers/ImageHandler";
import { LoggingDecorator } from "../decorators/LoggingDecorator";
import { AuthDecorator } from "../decorators/AuthDecorator";
import { FileLogger } from "../logging/FileLogger";
import { MongoLogger } from "../logging/MongoLogger";
import { CompositeLogger } from "../logging/CompositeLogger";
import { ImagenService } from "../services/ImagenService";
import { AuthService } from "../services/AuthService";
import { PipelineHandler } from "../handlers/PipeineHandler";
import { AppError } from "../types/AppError";

const router = Router(); 

//Configuración del sistema looging
const multiLogger = new CompositeLogger([ new FileLogger(), new MongoLogger()]); 

const factory = new ImagenService(); 
const authService = new AuthService(); 

//Handler principal decorado
const coreHandler = new ImageHandler(factory); 
const finalHandler = new LoggingDecorator( new AuthDecorator(coreHandler, authService), multiLogger); 


//  Redimensionar: POST /image/resize
router.post('/resize', upload.single('image'), handleUploadError, 
    async (req: Request, res:Response, next: NextFunction) => 
    {

        try{

            await finalHandler.handle({ req, res, operationType: 'resize'}); 

        }
        catch(error)
        {
            next(error);
        }
    }   
); 

// Recortar: POST /images/crop 
router.post('/crop', upload.single('image'), handleUploadError, 
    async (req: Request, res:Response, next: NextFunction) => 
    {

        try{

            await finalHandler.handle({ req, res, operationType: 'crop'}); 

        }
        catch(error)
        {
            next(error);
        }
    }  
); 

// Formato: Post /images/format
router.post('/format', upload.single('image'), handleUploadError, 
        async (req: Request, res:Response, next: NextFunction) => 
    {

        try{

            await finalHandler.handle({ req, res, operationType: 'format'}); 

        }
        catch(error)
        {
            next(error);
        }
    }  
); 


// Rotar: Post /images/rotate
router.post('/rotate', upload.single('image'), handleUploadError, 
    async (req: Request, res:Response, next:NextFunction) => 
    {

        try{

            await finalHandler.handle({ req, res, operationType: 'rotate'}); 

        }
        catch(error)
        {
            next(error);
        }
    }  
); 


// Filtro: Post /images/filter
router.post('/filter', upload.single('image'), handleUploadError, 
    async (req: Request, res:Response, next: NextFunction) => 
    {

        try{

            await finalHandler.handle({ req, res, operationType: 'filter'}); 

        }
        catch(error)
        {
            next(error);
        }
    }  
); 


//----    SECCION DE PIPELINE    ----

//Handler del pipeline con sus decoradores
const pipelineHandler = new PipelineHandler(factory);
const finalPipeline = new LoggingDecorator(new AuthDecorator(pipelineHandler, authService), multiLogger);

//Ruta especifica para el pipeline 
router.post('/pipeline', upload.single('image'), handleUploadError, 
    async (req: Request, res:Response, next: NextFunction) => 
    {

        try{

            await finalPipeline.handle({ req, res, operationType: 'pipeline'}); 

        }
        catch(error)
        {
            next(error);
        }
    }  
); 

export default router; 