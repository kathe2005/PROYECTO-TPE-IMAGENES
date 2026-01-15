//Importaciones de dependencias
import express, {Application} from "express";
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv'; 
import { connectDB } from "./config/database";
import authRoutes from './routes/auth.routes'; 
import imageRoutes from './routes/image.routes'; 
import "./types/custom";  
import { AppError } from "./types/AppError";


// Activación de Variables de Entorno
dotenv.config(); 

// Inicialización de la Aplicación
const app: Application = express();  
const PORT: string | number = process.env.PORT || 3000; 

//Conexión a MongoDB
connectDB(); 

//Middlewares Base
app.use(express.json()); 

//Registro de rutas
app.use('/auth', authRoutes);       //Conecta rutas de login/register
app.use('/images', imageRoutes);        //Conecta rutas de image

//Filtro de errores
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    
    let statusCode = 500;
    let errorCode = "INTERNAL_SERVER_ERROR";
    let errorMessage = "Error inesperado";

    
    if (err instanceof AppError) 
    {
        statusCode = err.statusCode;
        errorCode = err.errorCode; 
        errorMessage = err.message;
    } 
    else if (err instanceof Error) {
        errorMessage = err.message;
        
        if (errorMessage.toLowerCase().includes("token")) {
            statusCode = 401;
            errorCode = "UNAUTHORIZED";
        }
        
    }

    res.status(statusCode).json({
        "error": errorMessage,
        "code": errorCode,
        "timestamp": new Date().toISOString()
    });
});


//Encender 
app.listen(PORT, () => 
{
    console.log(`🚀 Misión en marcha: http://localhost:${PORT}`); 
}); 


