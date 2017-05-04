var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
// Set Handlebars.
var exphbs = require("express-handlebars");
// Import routes and give the server access to them.
var routes = require("./controllers/");

var port = 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



app.use("/", routes);

app.listen(port);
