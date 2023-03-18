const {createPool}  = require('mysql');

const pool = createPool({
    host : "blzdfacjjwbc9vvwczj8-mysql.services.clever-cloud.com" ,
    user : "uw6qg5icmrqkbgsl" ,
    password : "XGmf0ZpBH057PWO0sX5c" ,
    database :"blzdfacjjwbc9vvwczj8",
    connectionLimit : 10
});

module.exports = pool;