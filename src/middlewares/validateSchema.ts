/**
 *  Validación de Email 
 */

import { Request, Response, NextFunction } from "express";

// Formato: Valida que el email tenga estructura real 
export const validateEmail = (req: Request, res: Response, next: NextFunction) => 
{
    const { email } = req.body; 
    const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com|est\.ucab\.edu\.ve|ucab\.edu\.ve)$/i; 

    if ( !email ||  !emailRegex.test(email) )
    {
        return res.status(400).json
        (
            {
                success: false, 
                message: "⚠️ Acceso restringido. Solo se permiten correos de Gmail, Hotmail, Outlook, Yahoo o institucionales UCAB."
            }
        ); 
    }

    next();  //Dominio autorizado

}; 