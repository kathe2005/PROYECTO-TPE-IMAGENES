// Clase de ApiError
export class AppError extends Error {
    
    public statusCode: number;
    public errorCode: string; 

    constructor(
        message: string,
        errorCode: string,
        statusCode: number 
    ) {
        // Inicialización de la clase base
        super(message);

        this.statusCode = statusCode;
        this.errorCode = errorCode; 

        Error.captureStackTrace(this, this.constructor);
        
        // Asegura que instanceof AppError funcione correctamente después de heredar.
        Object.setPrototypeOf(this, AppError.prototype); 
    }
}