
import mysql from 'mysql2/promise';

let connection=await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD ,
    database:process.env.DATABASE_NAME,

})
const ConnectDb=async()=>{
    return connection
}

export {ConnectDb,connection}