const express = require ('express')
const {connectToDb, getDb}= require ('./db.js')
const { ObjectId } = require ('mongodb')

// INIT APP & MIDDLEWARE
const app = express()
//METODO 
app.use(express.json())
//Conexion

connectToDb((err)=> {
    if(!err){
    //Listen
        app.listen(3000,(req,res) =>{
         console.log("server listening on http://localhost:3000")
})
    db = getDb()
    }
})

//RUTAS

app.get('/books',(req,res)=>{
    let books = []

    db.collection('books')
    .find()
    .sort({ author:1 })
    .forEach(book => books.push(book))
    .then(() =>{
        res.status(200).json(books)
    })
    .catch(() =>{
        res.status(500).json({error:"No se encontraron los documentos"})
    }) 
})

app.get('/books/:id',(req,res)=>{
  
    db.collection('books')
    .findOne({ _id: new ObjectId (req.params.id)})
    .then(doc =>{
        res.status(200).json(doc)
    })
    .catch(err =>{
        res.status(500).json({error:"No se encontraron los documentos"})
    })
})

app.post('/books', (req, res) => {
    const book = req.body; // Corrected typo here
    db.collection('books')
    .insertOne(book)
    .then(result => {
        res.status(201).json(result); // Corrected typo here
    })
    .catch(err => {
        res.status(500).json({ error: 'No se creo el documento' });
    });
});

app.delete('/books/:id',(req,res)=>{
    const id = req.params.id
    db.collection('books')
    .deleteOne({ _id: new ObjectId (req.params.id)})
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(500).json({err:"No se borro"})
    })
})  

app.patch('/books/:id', (req, res) => {
    const update = req.body; // Corrected typo here
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .updateOne({ _id: new ObjectId (req.params.id)},{$set: update})
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500).json({err:"No se actualizo"})
        })
    }
    else{
        res.status(500).json({err:"No se actualizo el documento"})
    }
    
});
