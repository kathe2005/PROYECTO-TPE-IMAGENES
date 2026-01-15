//Importaciones de dependencias
import { IUser } from "../models/User";

//Permite entrar en las definiciones de una librería ya instalada.
declare module 'express-serve-static-core'
{
        // Buscamos la interfaz Request dentro de Express y le añadimos una nueva propiedad.
        interface Request
        {
            user?: Partial<IUser>; 
        }
}

//Cierre del modulo 
export {}; 