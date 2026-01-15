
//Definimos ITokenPayload
export interface ITokenPayload
{
    sub: string; 
    role:string; 
    iat?: number; 
    exp?:number; 
    email:string; 
}
