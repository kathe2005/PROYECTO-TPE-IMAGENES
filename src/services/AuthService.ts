import { IAuthService } from '../interfaces/IAuthService';
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import { ITokenPayload } from '../interfaces/ITokenPayload'; 
import { AppError } from '../types/AppError';

export class AuthService implements IAuthService
{
    private readonly saltRounds = 10; 

    //Clave Secreta
    private readonly jwtSecret = process.env.JWT_SECRET || 'secret_para_pruebas'; 

    //Hashear contraseña (Cifrado)
    async hashPassword(password: string): Promise<string> 
    {
        return await bcrypt.hash(password, this.saltRounds); 
    }

    //Método para validar (Comparación)
    async comparePassword(password: string, hash: string): Promise<boolean> 
    {
        return await bcrypt.compare(password,hash); 
    }


    //Generar Token JWT (Carnet de Identidad - Pasaporte)
    generateToken(userId: string): string 
    {
        //Header (Se crea la placa)  
        const options: jwt.SignOptions = {
            algorithm: 'HS256',
            expiresIn: '1h'                 //Tiempo de existencia de la placa 
        }

        //Payload (Se graba los datos en la placa)  
        const payload = {
            sub: userId, 
            role: 'ucabista'
        }

        //Signature (Se pone el sello final)  
        return jwt.sign(payload, this.jwtSecret, options); 
    }



    //Vefificar el Token 
    async verifyToken(token: string): Promise<ITokenPayload>
    {
        try{
            
            const decoded = jwt.verify(token, this.jwtSecret) as unknown as ITokenPayload; 
            return decoded; 
        }
        catch (error)
        {
            throw new AppError('Token inválido o expirado', 'AUTH_TOKEN_EXPIRED', 401); 
        }
    }

}