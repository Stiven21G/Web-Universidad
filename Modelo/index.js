import express from "express"
//IMPORTAR BASE DE DATOS
import { connection } from "./db.js"
//IMPORTAR RUTAS
import rutas from './Routes/routes.js'

const app = express()
//RUTA DEL PUERTO
const PORT = process.env.PORT ??3000

//ARCHIVOS ESTATICOS
app.use(express.static('public'));

//MIDDLEWARES
app.use(rutas)




app.listen(PORT, ()=>{
    console.log(`server listening on port http://localhost:${PORT}`)
})