//Importaciones de dependencias
import { Request, Response } from 'express'; 

//Definimos Imagen Request
export interface ImageRequest
{
    req: Request; 
    res: Response; 
    operationType: string;
}


//Definimos Imagen Response
export interface ImageResponse
{
    success:boolean;
}

//Definimos IImagenHandler

export interface IImageHandler
{
    handle(request: ImageRequest): Promise<ImageResponse>; 
}