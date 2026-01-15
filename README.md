# PROYECTO TPE - GESTIÓN DE IMÁGENES 
# 📸 Image Manipulation API - Tópicos Especiales de Programación
Este es el sistema central para el manejo de imagenes 

## 🏫 Información Institucional
* **Institución:** Universidad Católica Andrés Bello (UCAB)
* **Profesor:** Italo Visconti
* **Estudiante:** Katherine Amaya 
* **Proyecto:** API de Manipulación de Imágenes

## 🕵️ Descripción del Proyecto
Esta es una **API REST** robusta desarrollada en **TypeScript** que ofrece procesamiento de imágenes en tiempo real. El sistema permite a los usuarios autenticados subir archivos multimedia y aplicar transformaciones complejas mediante un motor de alto rendimiento. 
---

## 🚀 Stack Tecnológico
* **Lenguaje:** TypeScript (Strict Mode)
* **Motor API:** Express.js y Node.js
* **Procesamiento:** Sharp (High Performance)
* **Base de Datos:** MongoDB (Persistencia de usuario y auditoría)
* **Seguridad:** JWT + Bcrypt para hashing de contraseñas

---

## ⚙️ Instalación y Configuración 
#### Instrucciones de Instalación 
1. Tener Node.js y MongoDB Community Server instalado. 
2. Clonar el repositorio en su maquina local. 
3. Ejecutar `npm install` para instalar todas las librerias necesarias. 
4. MongoDB corriendo localmente (Puerto 27017). 
5. Se recomienda usar MongoDB Compass para visualización. 
6. Configura un archivo `.env` en la raiz con: 
    - PORT=3000
    - MONGO_URI=mongodb://localhost:27017/PROYECTO-TPE-IMAGENES
    - JWT_SECRET=super_cool_123

### Ejecucion del sistema 
1. Ejecutar el comando `npm run dev` en la terminal. El servidor iniciara en http://localhost:3000 con carga automatica
2. Las operaciones podrán ser auditadas en tiempo real en el archivo logs/app.log

---

## 🔑 Variables de entorno 
Para que el sistema funcione es necesario configurar un archivo .env en la raiz del proyecto. A contnuacion las variables necesarias
| Variable  |                                 Descripcion                                         |                    Ejemplo                      | 
| PORT      | Define el puerto en el que el servidor Express escuchara las peticiones             |                     3000                        |
| MONGO_URI | URI de conexión  para la base de datos MONGODB                                      | mongodb://localhost:27017/PROYECTO-TPE-IMAGENES |
|JWT_SECRET | Clave utilizada por la libreria jsonwebtoken para firmar y validar autenticidad     |                 super_cool_123                  |
|LOG_PATH   | Ruta relativa o absoluta donde el sistema escribirá el archivo de auditoria app.log |                ./logs/app.log                   |

Se incluye un archivo .env.example en el repositorio como referencia para la configuracion inicial 


## 📑 Detalles de Endpoints y Parámetros (Postman)

### RF1: 🔐 Autenticación (JWT)
Para acceder a las funciones de imagen, primero debe registrarse e iniciar sesión con email y password.
Para obtener acceso, debe enviar un JSON en el Body (raw) de Postman  
|   Método   |       Ruta         |               Descripción              |          Parametros        |
|   :---:    |       :---         |                 :---                   |            :---            |
|   POST     |   /auth/register   | Crea un nuevo usuario en BD            |      email, password       |
|   POST     |  /auth/login       | Retorna el Token para usar en rutas    |      email, password       |

## Ejemplo de Body en Postman 
{
    "email": "kamaya.23@est.ucab.edu.ve",
    "password": "1234"
}


## RF2: 🖼️ Manipulación de Imágenes (Sharp) 
Todas estas rutas requieren un token en la pestaña Authorization  -> Bearner Token y los archivos/datos en la pestaña  Body -> form-data

## 📋 Guía de Pruebas (Postman)
1. Registrar usuario en /auth/register.
2. Hacer login en /auth/login y copiar el token recibido.
3. En las rutas de imágenes, añadir Header: Authorization -> Bearer [TOKEN].
4. En Body, seleccionar form-data, clave "image" tipo File y subir archivo.

|   Método   |              Ruta             |     claves en Body (form-data)            |            Descripción            |        Valores de Ejemplo      |
|   :---:    |             :---              |          :---                             |               :---                |              :---              |
|   POST     |         /images/filter        |    image(file), filter                    | Aplicación de filtros (Grayscale) |     grayscale, blur, sharpen   |
|   POST     |        /images/resize         |    image(file), width, height             | Ajusta dimensiones (width/height) |            800, 600            |
|   POST     |       /images/rotate          |    image(file), angle                     | Rota la imagen (90, 180, 270)     |          90, 180, 270          |
|   POST     |       /images/format          |    image(file), format                    | Convierte a WebP, PNG o JPEG      |          wepb, png, jpeg       |  
|   POST     |      /images/crop             | image(file), left, top, width, height     | Recorta la imagen                 |       25, 25, 200, 200         |
|   POST     |      /image/pipeline          |                 operation                 | Realiza todas las transformaciones|                                |
---

## Valores de ejemplo de pipeline
[
  { "type": "resize", "params": { "width": 200, "height": 200 } },
  { "type": "filter", "params": { "filter": "grayscale" } },
  { "type": "rotate", "params": { "angle": 90 } },
  { "type": "format", "params": { "format": "png" } },
  { "type": "crop", "params": { "width": 25, "height": 25, "left": 10, "top": 10 } }
]

### 📤 Ejemplo de Respuesta Exitosa
El sistema procesa la imagen y devuelve el archivo binario directamente, permitiendo su visualización inmediata en Postman o en el navegador.

### 📤 Ejemplo de Respuesta de Error (JSON)
En caso de parámetros inválidos:
{
    "error": "El ángulo de rotación debe ser 90, 180 o 270",
    "code": "INVALID_ROTATION",
    "timestamp": "2026-01-14T..."
}

## 📊 Especificaciones Técnicas (Formatos)
|   Formato   |       Estado       |             Acción del Sistema                 |
|   :---:     |       :---         |                   :---                         |
|  JPEG/JPG   |        OK          |         Optimización y comprensión             |
|    PNG      |        OK          |        Preservación de transparencia           |
|    WebP     |        OK          |        Conversión de alta eficiencia           |
|  SVG/EXE    |     Bloqueado      |     Rechazado por el Middleware de Seguridad   |    


---













