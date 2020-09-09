var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended : false});
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://abhi13:test@ds163053.mlab.com:63053/emp_payroll',function(err){
  if(err) throw err;
});

var EmpSchema = new mongoose.Schema({
  empid       : String,
  name        : String,
  designation : String,
  manager     : String,
  children    : Array
});

var Emp = mongoose.model('Emp_payroll',EmpSchema);

module.exports = function(app){
  app.get('/',function(req, res){
    res.render('emp');
  });

//to get the Employee details in table
app.get('/details',function(req, res){
  Emp.find({},function(err, data){
    if(err) throw err;
   console.log(data);
   res.render('emp',{data: data});
  });
});

//get the Employees in hierarchy
app.get('/show',function(req,res){
  Emp.find({},function(err, data){
    if(err) throw err;
   //console.log(data);

   res.render('show',{data:  list_to_tree(data)});
  });
});


//get employee edit menu when clicked
app.get('/info/:id',function(req, res){
//console.log(req.params.id);
  Emp.find({empid:req.params.id},function(err, data){
    if(err) throw err;
  //  console.log(data);
   res.render('edit',{data : data});

  });
});

//Updating Employee record
app.put('/edit', urlEncodedParser,function(req, res){
  console.log(req.body);
  var data={
 name : req.body.name,
 designation : req.body.designation,
 manager : req.body.manager
 };
  Emp.update({empid : req.body.id},{$set : data},function(err, data){
    if (err) throw err;
    res.json(data);
 });
});

//Add employee form
app.get('/Add',function(req, res){
  Emp.find().sort('-empid').exec(function(err,data){
    if(err) throw err;
    //  console.log(data);
    res.render('add',{data:data});
  });
});

//Adding new  employee in database
app.post('/add-emp',urlEncodedParser,function(req, res){
var emp = Emp(req.body).save(function(err,data){
  if (err) throw err;
  //console.log(data);
  res.json(data);
});
});
app.get('/Emp-Tree',function(req, res){
  Emp.find({},function(err, data){
    if(err) throw err;

   res.render('tree',{data:  list_to_tree(data)});
  });

});


}

//function to convert flat data into hierarchy
function list_to_tree(list){
  var map = {}, node, roots = [], i;
  for (i = 0; i < list.length; i++) {
      map[list[i].name] = i; // initialize the map

  }
  for (i = 0; i < list.length; i++ ) {
      node = list[i];
      if (node.manager !== "") {
          // if you have dangling branches check that map[node.parentId] exists
          list[map[node.manager]].children.push(node);
      } else {
          roots.push(node);
      }
  }
  return roots;
};
