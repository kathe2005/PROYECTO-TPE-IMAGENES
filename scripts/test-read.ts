import fs from 'fs'; 
import path from 'path'; 

const nombreArchivo = 'README.md'; 

function ejecutarMisionLectura()
{
    try{
        
        const rutaAbsoluta = path.resolve(__dirname, '..', nombreArchivo);

        const contenido = fs.readFileSync(rutaAbsoluta, 'utf-8'); 

        console.log("==========================================");
        console.log("🕵️ CONTENIDO ENCONTRADO");
        console.log(contenido);
        console.log("==========================================");
        
    }
    catch(error)
    {
        console.error("❌ ERROR: No se encontró el archivo. Revisa si el nombre es correcto."); 
    }
}

ejecutarMisionLectura(); 

