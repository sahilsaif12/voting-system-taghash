import app from "./app.js";
import {ConnectDb, connection} from "./src/db/index.js";
const port =process.env.PORT || 8000

ConnectDb()
.then(() =>{
    app.listen(port,()=>{
        console.log(`Server is listening on http://localhost:${port}`);
        
    })
})
.catch(err=>{
    console.log(`Mysql db connection error : ${err.message}`);
})

// connection.query('select * from snippets')
// .then((res)=>{
//     console.log(res[0]);

// })
