const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//bring all routes here
const auth = require('./routes/api/auth');
const book = require('./routes/api/book');
const library = require('./routes/api/library');
const swapbook = require('./routes/api/swapbook');
const bookOrder = require('./routes/api/bookorder');
const data = require('./routes/api/data');





app.use('/static', express.static('static'));

//middleware for body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//mongodb configuration
const dbURL = require('./keys/myurl').mongoURL;
mongoose
.connect(dbURL)
.then(() => {
  console.log('mongodb is connected successfully');
})
.catch((err) => {
  console.log(err);
});


//actual routes
app.use('/api/auth',auth);
app.use('/api/book',book);
app.use('/api/library',library);
app.use('/api/swapbook',swapbook);
app.use('/api/bookOrder',bookOrder);
app.use('/api/data',data);


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('server is running at port', port);
});
