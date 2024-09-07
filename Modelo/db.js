//EL PROMISE ES PARA ASYNC-AWAIT
import { createPool } from "mysql2/promise";

// CONEXION A LA BASE DE DATOS, PREFERIBLEMENTE CON POOL
//SE PUEDE EXPORTAR DIRECTAMENTE, PERO ABAJO MEJOR ;)
export const connection = createPool({
    host: 'localhost',
    user: 'root',
    password: '12345',
    port: 3306,
    database: 'proyectos'
})
 
// export default conection();