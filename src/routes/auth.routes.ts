import { Router } from "express";
import { AuthService} from "../services/AuthService";
import { User } from "../models/User";
import { validateEmail } from "../middlewares/validateSchema";

const router = Router(); 
const authService = new AuthService();  // Instanciamos la seguridad 

// POST /auth/register - Registrar un nuevo usuario 
router.post('/register', validateEmail, async (req, res) =>
{
    try
    {
        const { email, password } = req.body; 

        // Hashear la constraseña antes de guardarla
        const hashedPassword = await authService.hashPassword(password); 

        //Crear el nuevo usuario en el DB
        const newUser = await User.create
        (
            {
                email, password: hashedPassword
            }
        ); 

        res.status(201).json
        (
            {
                success: true, 
                message: "Usuario registrado con éxito",
                data: { id: newUser._id, email: newUser.email }
            }
        ); 
    }
    catch(error)
    {
        res.status(400).json
        (
            {   
                success: false, 
                message: "Error al registrar el usuario"
            }
        ); 
    }
}
); 

// POST /auth/login - Validar credenciales (Token) 
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
            return res.status(401).json
            (
                {
                    success: false, 
                    message: "Credenciales Invalidas"
                }
            ); 
        }

        //Comparamos la contraseña enviada con el hash guardado
        const isMatch = await authService.comparePassword(password, user.password); 

        if( !isMatch )
        {
            return res.status(401).json
            (
                {
                    success: false,
                    message: "Credenciales Invalidas"
                }

            ); 
        }

        //Generar carnet de acceso (Token)
        const token = authService.generateToken(user._id.toString()); 

        res.status(200).json
        (
            {
                success: true, 
                message: "Acceso concedido", 
                token
            }
        ); 
    }
    catch (error)
    {
        res.status(500).json
        (
            {
                success: false, 
                message: "Fallo en el sistema de autenticación" 
            }
        ); 
    }


}

); 

export default router; 