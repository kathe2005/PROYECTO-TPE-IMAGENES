/**
 *  Protección de Rutas
 */

import { Request, Response, NextFunction } from 'express'; 
import jwt from 'jsonwebtoken'; 

export const authMiddleware = ( req: Request, res: Response, next: NextFunction ) => 
{
    const authHeader = req.headers.authorization; 
    const token = authHeader && authHeader.split(' ')[1]; // Formato: Token 

    if( !token )
    {
        return res.status(401).json
        (
            {
                success: false, 
                message: "Acceso denegado"
            }
        ); 
    }

    try
    {

        const secret = process.env.JWT_SECRET || 'secret_para_pruebas'; 
        const decoded = jwt.verify(token, secret); 

        // Inyectamos la identidad en la petición
        ( res as any ).user = decoded; 

        next(); 
    }
    catch (error)
    {
        return res.status(403).json
        (
            {
                success: false, 
                message: "❌ Token inválido o expirado"
            }
        ); 
    }
}; 