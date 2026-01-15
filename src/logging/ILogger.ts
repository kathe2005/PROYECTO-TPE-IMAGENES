
//Definimos ILogger
export interface ILogger
{
    log(entry: LogEntry): Promise<void>; 
}

//Definimos LogEntry
export interface LogEntry
{
    timestamp?: string; 
    level: 'info' | 'error'; 
    user: string; 
    endpoint: string; 
    params: object; 
    duration?: number; 
    result: 'success' | 'error'; 
    message?: string; 
}