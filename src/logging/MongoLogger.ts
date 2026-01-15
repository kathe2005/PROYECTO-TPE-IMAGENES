// Importaciones de dependencias
import { LogModel } from "../models/Log";
import { ILogger, LogEntry } from "./ILogger";

// Implementación del  MongoDB
export class MongoLogger implements ILogger
{
    // Método principal para guardar la entrada de log
    async log(entry: LogEntry): Promise<void>{
        try{
            // Crea un nuevo documento con la data recibida.
            await LogModel.create(entry); 
        }
        catch(error)
        {
            // Si la base de datos falla
            console.error("Error en MongoLogger: ", error); 
        }
    }
}