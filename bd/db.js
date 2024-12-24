const { MongoClient } = require("mongodb")
let dbConnection

//EXPORTAR
module.exports ={
    connectToDb: (callBack) => {
        MongoClient.connect('mongodb://localhost:27017/bookstore')
        .then((client)=>{
            dbConnection = client.db()
            return callBack()
        })
        .catch(err =>{
            console.log(err)
            return callBack(err)
        })
    },
    getDb: () =>dbConnection
}