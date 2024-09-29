import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToDb, getDb } from './database/db.js'; // Importar conexión a la base de datos
import router from './Routes/routes.js';

// Inicializar variables
let db;
const app = express();
const PORT = process.env.PORT ?? 4000;

// Middleware para archivos JSON
app.use(express.json());
app.use(router)
// Obtener el directorio actual
const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// Conectar a la base de datos


// Ruta para servir el archivo HTML principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// RUTA DE REGISTRO DE USUARIOS
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});