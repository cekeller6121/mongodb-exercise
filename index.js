console.log("Hello, Clement.");

const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
app.use(express.static('./'));

var db;

MongoClient.connect('mongodb://127.0.0.1:27017/robotsdb', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('database connected');
  });
});

app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/employed', function(req, res) {
  const employedBots = db.collection('robots').find();
  console.log(employedBots);
  res.render('employed', {employedBots:employedBots});
});

app.get('/unemployed', function(req, res) {
  res.render('unemployed');
});

// app.listen(3000, function() {
//   console.log("User Directory app started");
// });
