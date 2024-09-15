import express from "express"
//DIRECTORIOS
import path from 'path'
import { fileURLToPath } from "url"

const file = express()

//OBTENER DIRECTORIOARCHIVOS ESTATICOS
const fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(fileName)
file.use(express.static(path.join(__dirname,'..','public')))

file.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'public', 'index.html'));
});


export default file;