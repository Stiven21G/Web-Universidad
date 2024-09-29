import { MongoClient } from 'mongodb'

let dbConnection

//EXPORTAR
export const connectToDb= (callBack) => {
        MongoClient.connect('mongodb://localhost:27017/pagina_universidad')
        .then((client)=>{
            dbConnection = client.db();
            return callBack();
        })
        .catch(err =>{
            console.log(err)
            return callBack(err)
        })
    }

export const getDb = () => dbConnection;

    
 