import mongoose from "mongoose";
import dotenv from "dotenv"; 

//Cargar variables de entorno 
dotenv.config(); 

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/PROYECTO-TPE-IMAGENES'; 

export const connectDB = async () => 
{
    try{

        await mongoose.connect(MONGO_URI); 
        console.log('✅ Conexión Exitosa: El Cuartel de Datos está en línea.'); 

    }
    catch (error)
    {
        console.error('❌ Error de Conexión:', error); 
        process.exit(1);  //Detener si no hay base de datos 
    }
    
}