import { Schema, model, Document} from 'mongoose';

/**
 *  INTERFAZ DE USUARIO (IUser)
 *  Define la estructura lógica para TypeScript 
 */

export interface IUser
{
    id?: string; 
    email: string; 
    password: string; 
    createdAt?: Date; 
    updatedAt?: Date; 
}

/**
 *  ESQUEMA DE MONGOOSE
 *  Define cómo se guardarán los datos en la base de datos real 
 */

const userSchema = new Schema<IUser>(
{

    email: 
    {
        type: String, 
        required: [true, 'El email es obligatorio'], 
        unique: true, 
        lowercase: true, 
        trim: true
    }, 

    password:
    {
        type: String, 
        required: [true, 'La contraseña es vital'], 
        minlength: [6, 'La contraseña debe ser más robusta (minimo 6 caracteres)']

    }

}, 

{
    timestamps: true 
}

); 

export const User = model<IUser>('User', userSchema); 