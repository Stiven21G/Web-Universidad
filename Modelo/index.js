import express from "express"
//DIRECTORIOS
import path from 'path'
import { fileURLToPath } from "url"

//IMPORTAR BASE DE DATOS
import { connection } from "./db.js"

//IMPORTAR RUTAS
import rutas from './Routes/routes.js';
import cors from 'cors'
//RUTA DEL PUERTO
const PORT = process.env.PORT ??4000
const app = express()

//OBTENER DIRECTORIOARCHIVOS ESTATICOS
const fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(fileName)
app.use(express.static(path.join(__dirname,'..','public')))
//

//MIDDLEWARES
app.use(rutas)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'public', 'index.html'));
});


app.listen(PORT, ()=>{
    console.log(`server listening on port http://localhost:${PORT}`)
})