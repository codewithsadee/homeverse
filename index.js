var con = require('./connection')
var express = require("express");
var bodyParser = require('body-parser')
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.get('/' , (req, res ) => {
    res.sendFile(__dirname + 'buy.html')
});

app.post('/' , (req, res) => {
    var city = req.body.city;
    var state = req.body.state;
    var zip = req.body.zip;

    con.connect((err) => {
        if(err) throw err;

        var sql =
    })
});

app.listen(3000 , (err) => {
    if(!err)
        console.log("Successfully connected to PORT:3000");
    else console.log(err);
});