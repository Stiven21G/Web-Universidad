import express from "express"
//DIRECTORIOS
import path from 'path'
import { fileURLToPath } from "url"
let db
//IMPORTAR BASE DE DATOS
import {connectToDb, getDb} from './db.js'

//IMPORTAR RUTAS
import cors from 'cors'

//RUTA DEL PUERTO
const PORT = process.env.PORT ??4000
const app = express()

//OBTENER DIRECTORIOARCHIVOS ESTATICOS
const fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(fileName)
app.use(express.static(path.join(__dirname,'..','public')))

//CONEXION
connectToDb((err)=> {
    if(!err){
    //Listen
    app.listen(PORT, ()=>{
        console.log(`server listening on port http://localhost:${PORT}`)
    })
    db = getDb()
    }
})

//RUTAS

app.get('/estudiantes',(req,res)=>{
    let estudiantes = []

    db.collection('estudiantes')
    .find()
    .sort({ name:1 })
    .forEach(es => estudiantes.push(es))
    .then(() =>{
        res.status(200).json(books)
    })
    .catch(() =>{
        res.status(500).json({error:"No se encontraron los documentos"})
    }) 
})



//MIDDLEWARES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'public', 'index.html'));
});

app.get('/estudiantes',(req,res)=>{

})




