import expres from "express"

const app = expres()

const PORT = process.env.PORT ??3000

app.listen(PORT, ()=>{
    console.log(`server listening on port http://localhost:${PORT}`)
})