//ROUTER SIRVE PARA CREAR RUTAS Y AGRUPARLAS
import { Router } from "express";
import bcrypt from 'bcrypt'; 
import { connectToDb, getDb } from '../database/db.js';  // bcrypt Hashea las contraseñas
import multer from 'multer';
import { validarDatos } from "../Esquema/esquema.js";

const router = Router()
let db;

connectToDb((err) => {
   if (!err) { 
       db = getDb();
   }else{
      window.alert("Fallo en la base de datos")
   }
});

//METODOS DEL BACKEND
router.post('/register', async (req, res) => {
    const { names, lastName, email, password } = req.body;

    // Validar los datos
    const { success, error } = validarDatos({ names, lastName, email, password });

    if (!success) {
        return res.status(400).json({
            message: 'Error en la validación',
            errors: error.issues // Cambié el mensaje para incluir detalles del error
        });
    }

    try {
        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el estudiante en la base de datos
        const result = await db.collection('estudiantes').insertOne({ 
            names,
            lastName,
            email,
            password: hashedPassword 
        });

        // Responder con el ID del nuevo estudiante
        return res.status(201).json({
            message: 'Estudiante registrado con éxito',
            studentId: result.insertedId
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'No se pudo registrar el estudiante' });
    }
});

// RUTA DE LOGIN DE USUARIOS
router.post('/login', async (req, res) => {
   const { email, password } = req.body;  // Extraer los datos del cuerpo de la solicitud

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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/Asus/Documents/MONGO PDF'); // Directory to save files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });

router.post('/main', upload.single('archivo'), async (req, res) => {
    const { nombreProyecto, email1, email2, ciclos } = req.body;
    const archivoPDF = req.file; // The uploaded file

    const fecha = new Date();

    const mes = fecha.getMonth() + 1; // Sumar 1 porque los meses empiezan desde 0
    const diaDelMes = fecha.getDate();
    const anio = fecha.getFullYear();
    const fechaFormateada = `${diaDelMes}/${mes}/${anio}`;

    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();

    const horaCompleta = `${hora}:${minutos}:${segundos}`
    try {
        const datos = await db.collection('documentos_entregados').insertOne({
            nombreProyecto,
            email1,
            email2,
            ciclos,
            archivo: archivoPDF.filename, // Save the file path or name in the database
            fechaFormateada,
            horaCompleta
        });

        res.status(201).json({ success: "Elementos y archivo enviados con éxito" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error del servidor' });
    }
});



export default router;