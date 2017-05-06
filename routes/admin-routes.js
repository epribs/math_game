/**
 * This is node js admin controller perform below functions
 * 1) add/update/delete/view a student
 * 2) add/update/delete/view a teacher - DONE
 * 3) add/update/delete/view a classroom
 * 4) view tests for a classroom for a specified date range
 * * */

// Dependencies
var db = require("../models");

// Admin Routes
// =============================================================
module.exports = function(app) {

app.get("/admin", function(req, res) {
  res.render("index", { "view": "admin" });
});

// get all teachers

app.get("/admin/teachers", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Teacher.findAll({}).then(function(dbTeacher) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbTeacher);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });
});

// add a teacher

app.post("/admin/teachers", function(req, res) {
   // create takes an argument of an object describing the item we want to
   //insert into our table. In this case we just we pass in an object with a text
   // and complete property (req.body)
    db.Teacher.create({
      name: req.body.name,
      username: req.body.username,
      password:req.body.password
    }).then(function(dbTeacher) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbTeacher);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });
});

//update a teacher

app.put("/admin/teachers/:id", function(req, res) {
    db.Teacher.update({
      name: req.body.name,
      username: req.body.username,
      password:req.body.password
        }, {
        where: {
            id: req.params.id
        }
        }).then(function(dbTeacher) {
        res.json(dbTeacher);
        }).catch(function(err){
           res.status(500);
           res.json({"ERROR":err.stack});
        });
});

//delete a teacher

app.delete("/admin/teachers/:id", function(req, res) {
    // We just have to specify which teacher we want to destroy with "where"
    db.Teacher.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTeacher) {
      res.json(dbTeacher);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });

  });

}