//ROUTER SIRVE PARA CREAR RUTAS Y AGRUPARLAS
import { Router } from "express";
const router = Router()

//METODOS DEL BACKEND
router.get('/ja',async (req,res) =>{
    const [result] = await connection.query('SELECT "JAHUMMMSS" AS result')
    res.json(result[0])
 })
 
 router.get('/hola', (req,res) =>{
    res.send('Hola')
 })

 

export default router