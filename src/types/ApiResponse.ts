/**
 *  Interfaz Generica 
 */

export interface ApiResponse<T>
{
    success: boolean;  
    data?: T; 
    message: string;
    timestamp: Date; 
}


//Uso
export type ImageApiResponse = ApiResponse<Buffer>; 
export type AuthApiResponse = ApiResponse<{ token: string}>; 