//Importacion de Interfaces y Servicios 
import { IImageHandler, ImageRequest, ImageResponse} from '../interfaces/IImageHandler';
import { AuthService } from '../services/AuthService';
import { AppError } from '../types/AppError';

//Implementa Handler para que el sistema crea que es un manejador normal 
export class AuthDecorator implements IImageHandler
{
    //Recibe el manejador real y el servicio de autenticacion
    constructor ( private inner: IImageHandler,  private authService: AuthService){}

    async handle(request: ImageRequest): Promise<ImageResponse>
    {
        //Extrae de la credencial (token) del encabezado de la peticion 
        const authHeader = request.req.headers.authorization; 

        //Valida de presencia del Token 
        if ( !authHeader || !authHeader.startsWith('Bearer ') )
        {
            //Token invalido o ausente 
            throw new AppError("Token JWT ausente o inválido", "UNAUTHORIZED", 401);

        }

        //Extrae solo el token 
        const token = authHeader.split(' ')[1]; 

        try
        {
            //Verifica la identidad con el servicio 
            const decoded = await this.authService.verifyToken(token) as {sub: string, email: string}; 

            //Guarda los datos del usuario 
            (request.req as unknown as {user: Object}).user = {
                id: decoded.sub,
                email: decoded.email
            };

            return await this.inner.handle(request); 
        }
        catch (error: unknown)
        {
            //Error 401: Token invalido o ausente
            
            if (error instanceof AppError) 
            {
                throw error;
            }

            throw new AppError("Error de autenticación", "UNAUTHORIZED", 401);

        }
    }
}