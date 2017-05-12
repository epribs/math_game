// Dependencies
var db = require("../models");
// =============================================================
// Admin Routes 
// =============================================================
module.exports = function(app) {

app.get("/", function(req, res) {
  res.render("index");
});

// =============================================================
// log out route
// =============================================================

app.get("/logout",function(req, res) {
    req.logout();
    req.flash("success_msg","you are logged out");
    res.redirect('/');    
});


}