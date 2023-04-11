let con = require('./connection')
let express = require("express");
let bodyParser = require('body-parser');
const { connect } = require('./connection');
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('./public/'))
app.set('view engine', 'ejs')

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/public/index.html')
// });

// app.post('/' , (req, res) => {

// });


// app.get('/buy' , (req, res ) => {
//   res.sendFile(__dirname + '../buy.html')
// });
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

app.post('/buy', (req, res) => {
  let city = req.body.city;
  let state = req.body.state;
  let zip = req.body.zip;

  // con.connect((err) => {
  //   if (err) throw err;

    con.query("SELECT * FROM property", (err, result, fields) => {
      if (err) throw err;
      // console.log(res);
      result.forEach((property) => {
        // console.log(property.city , " " , city);
        if (property.city === city)
          finalProps.push(property.p_id)
        });
        res.redirect('/property')
      });
    // })
});

app.post('/rent' , (req ,res) => {
  let address = req.body.address;
  let bedRooms = req.body.bedrooms;
  let bathrooms = req.body.bathrooms;
  let city = req.body.city;
  let state = req.body.state;
  let zipCode = req.body.zipCode;
  let price  = req.body.price;



  con.query("INSERT INTO property")
});


app.get('/property', (req, res) => {
  // con.connect((err) => {
    // if (err) throw err;

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
  // });
});

// if(finalProps.length !== 0) {
//   res.render(__dirname + '/public/ava.ejs' , {property : finalProps})
// } else {
//   res.render(__dirname + './public/notAva.html')
// }

app.listen(3000, (err) => {
  if (!err)
    console.log("Successfully connected to PORT:3000");
  else console.log(err);
});