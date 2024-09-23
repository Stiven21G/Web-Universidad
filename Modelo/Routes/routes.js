//ROUTER SIRVE PARA CREAR RUTAS Y AGRUPARLAS
import { Router } from "express";
import bcrypt from 'bcrypt'; 
import { connectToDb, getDb } from '../db.js';  // Asegúrate de que bcrypt esté instalado
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

// Ruta para obtener la lista de estudiantes (puedes ajustarla según tus necesidades)
router.get('/estudiantes', (req, res) => {
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


 

export default router;