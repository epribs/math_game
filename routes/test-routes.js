// Dependencies
var db = require("../models");
// =============================================================
// Test result Routes 
// =============================================================
module.exports = function(app) {


//get route for test collection

app.get("/test", function(req, res) {
  // findAll returns all entries for a table when used with no options
    db.Test.findAll({}).then(function(dbTest) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTest);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });
});
  


// =============================================================
// post test route
// =============================================================

app.post("/test",function(req, res) {
    // create takes an argument of an object describing the item we want to
   //insert into our table. In this case we just we pass in an object with a text
   // and complete property (req.body)
    db.Test.create({
      name: req.body.name,  
      totalQuestions:req.body.totalQuestions,
      correctQuestions: req.body.correctQuestions,
      wrongQuestions:req.body.wrongQuestions,
      ClassroomId : req.body.ClassroomId,
      StudentId : req.body.StudentId
    }).then(function(dbTest) {
      res.json(dbTest);
      //req.flash("success_msg","you are logged out");
      res.redirect('/logout');
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });

});


}//end of module.exports