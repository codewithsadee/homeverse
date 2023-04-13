let con = require('./connection')
let express = require("express");
let bodyParser = require('body-parser');
const { connect } = require('./connection');
const { resetWatchers } = require('nodemon/lib/monitor/watch');
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('./public/'))
app.set('view engine', 'ejs')

con.connect(function(err) {
  if (err) throw err
});

let finalProps = []

app.get('/buy' , (req , res) => {
  res.sendFile(__dirname + '/public/buy.html')
});

app.get('/rent' , (req , res) => {
  res.sendFile(__dirname  + '/public/rent.html');
});

app.get('/sell' , (req , res) => {
  res.sendFile(__dirname + '/public/sell.html');
});


app.post('/sell' , (req ,res) => {
  let address = req.body.address;
  let bedRooms = req.body.bedrooms;
  let bathrooms = req.body.bathrooms;
  let propertyArea = req.body.propertyArea;
  let city = req.body.city;
  let state = req.body.state;
  let zipCode = req.body.zipCode;
  let price  = req.body.price;
  let rent = 0;

  let sql = "INSERT INTO property (p_area , address , bedrooms , bathrooms , city , state , zipcode , price ,on_rent_or_sold) VALUES ?";

  const values = [ [`${propertyArea}` , `${address}` , `${bedRooms}` , `${bathrooms}` , `${city}` , `${state}` , `${zipCode}` , `${price}` , `${rent}`] ]

  con.query(sql , [values] , (err , result) => {
    if(err) throw err;
    else {
      res.redirect('/success');
    }
  })
});

app.get('/success' , (req ,res) => {
  res.sendFile(__dirname + '/public/successf.html');
});

app.post('/buy', (req, res) => {
  let city = req.body.city;
  let state = req.body.state;
  let zip = req.body.zip;

  con.query("SELECT * FROM property", (err, result, fields) => {
    if (err) throw err;
    // console.log(res);
    result.forEach((property) => {
        // console.log(property.city , " " , city);
        if (property.city === city && property.state === state)
        finalProps.push(property.p_id)
      });
        res.redirect('/property');
      });
    });

    app.post('/rent' , (req ,res) => {
      let address = req.body.address;
  let bedRooms = req.body.bedrooms;
  let bathrooms = req.body.bathrooms;
  let propertyArea = req.body.propertyArea;
  let city = req.body.city;
  let state = req.body.state;
  let zipCode = req.body.zipCode;
  let price  = req.body.price;
  let rent = 0;

  let sql = "INSERT INTO property (p_area , address , bedrooms , bathrooms , city , state , zipcode , price ,on_rent_or_sold) VALUES ?";

  const values = [ [`${propertyArea}` , `${address}` , `${bedRooms}` , `${bathrooms}` , `${city}` , `${state}` , `${zipCode}` , `${price}` , `${rent}`] ]

  con.query(sql , [values] , (err , result) => {
    if(err) throw err;
    else {
      res.redirect('/success');
    }
  })
});

app.get('/success' , (req ,res) => {
  res.sendFile(__dirname + '/public/successf.html');
});

app.get('/enquiry' , (req , res) => {

  let sql = `SELECT name , Email , phone
            FROM Agent;`

  con.query(sql , (err , result) => {
    if(err) throw err;
    let final = [];
    result.forEach((element) => {
      let obj = {
        name : element.name ,
        email : element.Email ,
        phone : element.phone
      };
      final.push(obj);
    });
  res.render(__dirname + '/public/enquiry.ejs' , {agents : final});
  });
});

app.get('/property', (req, res) => {

  let sql = `SELECT property.p_id,
  Agent.name AS agent_name,
  property.city,
  property.state,
                      property.p_area,
                      property.price,
                      property.bedrooms ,
                      property.bathrooms ,
                      property.address,
                      property.zipcode
                  FROM property
                  JOIN Agent ON property.assigned_agent = Agent.a_id;`



    con.query(sql, (err, result) => {
      if (err) throw err;
      let final = [];
      result.forEach((element) => {
        if (finalProps.includes(element.p_id)) {
          let obj = {
            name: element.agent_name,
            city: element.city,
            state: element.state,
            area: element.p_area,
            price : element.price ,
            address : element.address,
            zipCode: element.zipcode ,
            bedrooms : element.bedrooms ,
            bathrooms: element.bathrooms ,
          };
          final.push(obj);
        }
      });
      res.render(__dirname + '/public/ava.ejs', {
        apartments: final
      })
    });
});

app.listen(3000, (err) => {
  if (!err)
    console.log("Successfully connected to PORT:3000");
  else console.log(err);
});