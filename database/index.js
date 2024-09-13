const mysql = require("mysql2");

//should have been done from .env file with dotenv
const db = mysql.createConnection({
    host:"",
    user:"",
    password:"",
    database:"",
    port:""
})

db.connect((err)=>{
    if(err){
        console.error("connection to database failed"+ err)
        return
    }
    console.log("connection to database established")
})