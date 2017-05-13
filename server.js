// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./models");


//view engine
app.set("views",path.join(__dirname,"views"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser());  

// Static directory
app.use(express.static(path.join(__dirname,"public")));

//Express session
app.use(session({
    secret: "secret",
    saveUninitialized:true,
    resave: true
}));

//passport init
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Connect flash
app.use(flash());

//Global vars
app.use(function(req,res,next){
   res.locals.success_msg = req.flash('sucess_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   res.locals.user = req.user || null;
   res.locals.isStudent = (function(){
     if(req.user){
       console.log(req.user.role);
       return req.user.role === "student";
     }
   }());
   res.locals.isTeacher = (function(){
     if(req.user){
       console.log(req.user.role);
       return req.user.role === "teacher";
     }
   }());

   next();
});

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));


// Routes =============================================================
require("./routes/admin-routes.js")(app);
require("./routes/auth-routes.js")(app);
require("./routes/login-routes.js")(app);
require("./routes/test-routes.js")(app);
require("./routes/leaderboard-routes.js")(app);
// Syncing our sequelize models and then starting our express app
db.sequelize.sync({force:false}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
