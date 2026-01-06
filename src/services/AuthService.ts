import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 

//Interfaz IAuthService: El Manual de Procedimientos
export interface IAuthService
{
    hashPassword(password: string): Promise<string>; 
    comparePassword(password: string, hash: string): Promise<boolean>; 
    generateToken(userId: string): string; 
}

export class AuthService implements IAuthService
{
    private readonly saltRounds = 10; 
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


    //Generar Token JWT (Carnet de Identidad)
    generateToken(userId: string): string 
    {
        return jwt.sign(
            { sub: userId }, 
            this.jwtSecret,
            { expiresIn: '1h' } //El carnet vence en 1 hora 
        ); 
    }

}