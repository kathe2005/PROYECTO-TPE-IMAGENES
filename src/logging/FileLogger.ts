//Importaciones de dependencias
import fs from 'fs/promises'; 
import path from 'path';
import { ILogger, LogEntry } from './ILogger';


/**
 *  FileLogger: Guarda cada modificacion en un archivo fisico 
 */
export class FileLogger implements ILogger
{
    //Define la rutas de las carpetas y el archivo 
    private logDirPath = path.join(process.cwd(), 'logs'); 
    private logFilePath = path.join(this.logDirPath, 'app.log'); 

    async log(entry: LogEntry): Promise<void>
    {
        //Formato de entrada
        const line = JSON.stringify(entry) + '\n';  

        try
        {
            //Crear carpeta si no existe 
            await fs.mkdir(this.logDirPath, { recursive: true });

            await fs.appendFile(this.logFilePath, line); 
        }
        catch ( error )
        {
            console.error("❌ Error crítico escribiendo el log:"); 
        }
    }

}