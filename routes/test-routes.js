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

//get route for tests by classroom id

app.get("/test/last7Days/:classnumber", function(req, res) {
  // findAll returns all entries for a table when used with no options
    db.Test.findAll({
      where:{
        $and: [
              {
                ClassroomId : req.params.classnumber
              },
              {
                createdAt: {
                $lt: new Date(),
                $gt: new Date(new Date() - (7 * 24 * 60 * 60 * 1000))
                }
              }
            ]
      }    
      
    }).then(function(dbTest) {
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

//get route for tests by classroom id

app.get("/test/last7Days/grade1/top3", function(req, res) {
  // findAll returns all entries for a table when used with no options
    db.Test.findAll({
      where:{
        $and: [
              {
               ClassroomId: {
                    $in: ['101','102','103','104','105','106','107','108']
                }
              },
              {
                createdAt: {
                $lt: new Date(),
                $gt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000)
                }
              }
            ]
      },
       order: [
                ['correctQuestions', 'DESC']
       ],

       limit:3

    }).then(function(dbTest) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTest);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });
});
  




}//end of module.exports