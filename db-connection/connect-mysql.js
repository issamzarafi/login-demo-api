const mysql = require('mysql');
const DBconnection= mysql.createConnection({
  host:process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA_NAME
});

DBconnection.connect((err)=>{
    if(err){
        console.log('Connection to Mysql Database Failed.',err);
    }
    else
    {
        console.log('Connection to Mysql Database Success.');
    }
});

module.exports=DBconnection;