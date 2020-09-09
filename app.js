var express = require('express');
var app = express();
var EmpController = require('./controllers/EmpController');
app.set('view engine','ejs');
app.use(express.static('./public/assets'));
EmpController(app);


//port number
app.listen(3010);
console.log("server has started");
