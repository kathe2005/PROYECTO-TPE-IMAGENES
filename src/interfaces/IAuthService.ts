//Interfaz IAuthService: El Manual de Procedimientos
export interface IAuthService
{
    hashPassword(password: string): Promise<string>; 
    comparePassword(password: string, hash: string): Promise<boolean>; 
    generateToken(userId: string): string; 
}