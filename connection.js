const mysql  = require('mysql');

const con = mysql.createConnection({
    host : "blzdfacjjwbc9vvwczj8-mysql.services.clever-cloud.com" ,
    user : "uw6qg5icmrqkbgsl",
    password : "XGmf0ZpBH057PWO0sX5c" ,
    database :"blzdfacjjwbc9vvwczj8",
    connectionLimit : 10
});

module.exports = con;