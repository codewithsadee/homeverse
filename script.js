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

app.post('/buy', (req, res) => {
  let city = req.body.city;
  let state = req.body.state;
  let zip = req.body.zip;
  console.log(city);

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
// finalProps.push(37);
// finalProps.push(24);

app.get('/property', (req, res) => {
  // con.connect((err) => {
    // if (err) throw err;

    let sql = `SELECT property.p_id,
                      Agent.name AS agent_name,
                      property.city,
                      property.state,
                      property.p_area,
                      property.price,
                      property.address_line_1,
                      property.address_line_2,
                      property.address_line_3,
                      property.zipcode
                  FROM property
                  JOIN Agent ON property.agent_assigned = Agent.a_id;`



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
            address_line1: element.address_line_1,
            address_line2: element.address_line_2,
            address_line3: element.address_line_3,
            zipCode: element.zipcode
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