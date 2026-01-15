import { Router, Request, Response } from "express";
import { AuthService} from "../services/AuthService";
import { User } from "../models/User";
import { validateEmail } from "../middlewares/validateSchema";
import { ApiResponse } from "../types/ApiResponse";

const router = Router(); 
const authService = new AuthService();  // Instanciamos la seguridad 

type AuthApiResponse = ApiResponse<{ id: string;  email: string, token:string}>; 

// POST /auth/register - Registra un nuevo usuario 
router.post('/register', validateEmail, async (req: Request, res: Response) =>
{
    try
    {
        const { email, password } = req.body; 

        //Verifica si el usuario existe antes de hashear 
        const existingUser = await User.findOne({email}); 
        if(existingUser)
        {
            return res.status(400).json({
                error: "El correo electronico ya esta registrado",
                code: "USER_EXISTS",
                timestamp: new Date().toISOString()
            }); 
        }

        // Hashea la constraseña antes de guardarla
        const hashedPassword = await authService.hashPassword(password); 

        //Crear el nuevo usuario en el DB
        const newUser = await User.create
        (
            {
                email, password: hashedPassword
            }
        ); 

        //Generar token 
        const token = authService.generateToken(newUser._id.toString()); 

        const response: AuthApiResponse = {
            success: true,
            data: { 
                id: newUser._id.toString(),
                email: newUser.email, 
                token: token
            },
            message: "Usuario registrado con exito", 
            timestamp: new Date()
        }

        return res.status(201).json(response); 

    }
    catch(error: unknown)
    {
        //Error de 500
        res.status(500).json({
            error: "Error interno al crear el usuario",
            code: "INTERNAL_ERROR",
            timestamp: new Date().toISOString()
        });
    }
}
); 

// POST /auth/login - Valida credenciales (Token) 
router.post('/login', validateEmail, async (req, res) =>
{
    try
    {
        const { email, password } = req.body; 

        // Buscamos al usuario por su email 
        const user = await User.findOne
        (
            { email }
        ); 

        if( !user )
        {
            return res.status(400).json({
                error: "Credenciales Invalidas",
                code: "UNAUTHORIZED",
                timestamp: new Date().toISOString()
            }); 
        }

        //Comparamos la contraseña enviada con el hash guardado
        const isMatch = await authService.comparePassword(password, user.password); 

        if( !isMatch )
        {
            return res.status(400).json({
                error: "Credenciales Invalidas",
                code: "UNAUTHORIZED",
                timestamp: new Date().toISOString()
            }); 
        }



        //Generar carnet de acceso (Token)
        const token = authService.generateToken(user._id.toString()); 

        const response: ApiResponse<{ token: string }> = 
        {
            success: true, 
            data: {token},
            message: "Acceso concedido",
            timestamp: new Date()

        }
        return res.status(200).json(response); 
    }
    catch (error: unknown)
    {
        //Error de 500 
        res.status(500).json
        (
            {
                error: "Fallo en el sistema de autenticacion",
                code: "AUTH_SYSTEM_ERROR",
                timestamp: new Date().toISOString()
            }
        ); 
    }
}

); 

export default router; 