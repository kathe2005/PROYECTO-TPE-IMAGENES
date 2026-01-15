//Importaciones 
import mongoose from "mongoose";
import dotenv from "dotenv"; 

//Carga las variables del archivo .env para poder leerlas 
dotenv.config(); 
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/PROYECTO-TPE-IMAGENES'; 

//Funcion de la Conexion 
export const connectDB = async () : Promise<void> => 
{
    try{

        const conn = await mongoose.connect(MONGO_URI); 
        console.log(`✅ Conexión Exitosa: El Cuartel [${conn.connection.host}] está en línea.`); 

    }
    catch (error)
    {
        console.error('❌ Error de Conexión:', error); 
        process.exit(1);  
    }
    
}