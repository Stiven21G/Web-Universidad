import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';  // Asegúrate de que bcrypt esté instalado
import { connectToDb, getDb } from './db.js'; // Importar conexión a la base de datos

// Inicializar variables
let db;
const app = express();
const PORT = process.env.PORT ?? 4000;

// Middleware para archivos JSON
app.use(express.json());

// Obtener el directorio actual
const fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(fileName);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '..', 'public')));

// Conectar a la base de datos
connectToDb((err) => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`);
        });
        db = getDb();
    }
});

// Ruta para servir el archivo HTML principal (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// RUTA DE REGISTRO DE USUARIOS
app.post('/register/register.html', async (req, res) => {
    const { names,lastName, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    try {
        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await db.collection('estudiantes').insertOne({ names,lastName,email, password: hashedPassword });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'No se pudo registrar el estudiante' });
    }
});

// RUTA DE LOGIN DE USUARIOS
app.post('/login', async (req, res) => {
    const { email, password } = req.body;  // Extraer los datos del cuerpo de la solicitud

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email y contraseña son requeridos' });
    }

    try {
        const user = await db.collection('estudiantes').findOne({ email });  // Buscar usuario por correo

        if (!user) {
            return res.status(400).json({ success: false, message: 'Correo no registrado' });
        }

        // Comparar la contraseña ingresada con la almacenada usando bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // Si todo está bien, enviar respuesta exitosa
        res.status(200).json({ success: true, message: 'Login exitoso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
});

// Ruta para obtener la lista de estudiantes (puedes ajustarla según tus necesidades)
app.get('/estudiantes', (req, res) => {
    let estudiantes = [];

    db.collection('estudiantes')
        .find()
        .forEach(est => estudiantes.push(est))
        .then(() => {
            res.status(200).json(estudiantes);
        })
        .catch(() => {
            res.status(500).json({ error: 'No se hallaron estudiantes' });
        });
});
