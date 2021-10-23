const SeqLibrary = require("sequelize");

const conn =

{
    DATABASE: 'datawarehouse',
    DIALECT: 'mysql',
    HOST: '127.0.0.1',
    PASSWORD: 'admin',
    USERNAME: 'root'
}


const sequelize = new SeqLibrary(conn.DATABASE, conn.USERNAME, conn.PASSWORD, {
    host: conn.HOST,
    dialect: conn.DIALECT,
});

sequelize.authenticate().then(() => {
    console.log("Conectado a la base de datos");
}).catch(err => {
    console.error("Error de conexion" + err);
});

const jwt = require('jsonwebtoken');
const firma = "keysecret";
const puerto = 3001;

const m = new Date();
const ahora = m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();


module.exports = { sequelize, jwt, firma, ahora, puerto };
