import express from "express";
import dotenv from 'dotenv'; 
import { connectDB } from "./config/database";
import authRoutes from './routes/auth.routes'; 
import imageRoutes from './routes/image.routes'; 

//Cargar variables 
dotenv.config(); 

const app = express(); 
const PORT = process.env.PORT || 3000; 

//Conectar a MongoDB 
connectDB(); 

//Middlewares 
app.use(express.json()); 

//Conectar las rutas que ya tienes 
app.use('/api/auth', authRoutes);       //Conecta rutas de login/register
app.use('/api/images', imageRoutes);    //Conecta rutas de Sharp/Multer

//Encender 
app.listen(PORT, () => 
{
    console.log(`🚀 Misión en marcha: http://localhost:${PORT}`); 
}); 
