var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://ccruml20:Cruml3594@ds051595.mlab.com:51595/chase_portfolio_projects');
// mongoose.connect('mongodb://localhost:27017/MyPortfolio');
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error: '));
//-------------->SET UP SESSIONS<-----------------
app.use(session({
  secret: 'mySecretSting',
  saveUnitialized: false,
  resave: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
  store: new MongoStore({mongooseConnection: db, ttl: 2 * 24 * 60 * 60})

}))
// SAVE TO SESSIONS
app.post('/cart', function(req, res){
  var cart = req.body;
  req.session.cart = cart;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  })
});

app.get('/cart', function(req,res){
  if(typeof req.session.cart !== 'undefined'){
    res.json(req.session.cart);
  }
});
//-------------->END SESSIONS<-------------------

var Projects = require('./models/projects.js');

app.post('/projects', function(req, res){
  var project = req.body;

  Projects.create(project, function(err, projects){
    if(err){
      throw err;
    }
    res.json(projects)
  })
});

//------------->GET PROJECTS<--------------
app.get('/projects', function(req, res){
  Projects.find(function(err, projects){
    if(err){
      throw err;
    }
    res.json(projects)
  })
});

//----------------->DELETE PROJECTS<---------------
app.delete('/projects/:_id', function(req, res){
  var query = {_id: req.params._id};

  Projects.remove(query, function(err, projects){
    if(err){
      console.log(' # API DELETE PROJECTS: ', err);
    }
    res.json(projects)
  })
})

//------------------>UPDATE PROJECT<------------------
app.put('/projects/:_id', function(req, res){
  var project = req.body;
  var query = req.params._id;

  var update = {
    '$set': {
      title:project.title,
      description:project.description,
      image:project.image,
      price:project.price
    }
  };
  var options = {new: true};

  Projects.findOneAndUpdate(query, update, options, function(err, projects){
    if(err){
      throw err
    }
    res.json(projects);
  })
})

//------------------------. GET PROJECT IMAGES API <------------------------
app.get('/images', function(req, res){
  const imgFolder = __dirname + '/public/images/';
  //require file system
  const fs = require('fs');
  fs.readdir(imgFolder, function(err, files){
    if(err){
      return console.error(err);
    }
    const filesArr = [];
    files.forEach(function(file){
      filesArr.push({name: file});
    });
    res.json(filesArr);
  })
})

//API end
app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API Server is listening on http://localhost:3001');
})
