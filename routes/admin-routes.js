/**
 * This is node js admin controller perform below functions
 * 1) add/update/delete/view a student
 * 2) add/update/delete/view a teacher - DONE
 * 3) add/update/delete/view a classroom
 * 4) view tests for a classroom for a specified date range
 * * */

// Dependencies
var db = require("../models");
var bcrypt = require("bcryptjs");
// =============================================================
// Admin Routes 
// =============================================================
module.exports = function(app) {

app.get("/admin", function(req, res) {
  res.render("index", { "view": "admin" });
});

// =============================================================
// Teacher Routes
// =============================================================

// get all teachers

app.get("/admin/api/teachers", function(req, res) {
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

app.post("/admin/api/teachers", function(req, res) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
      req.body.password = hash;
      //create teacher in db
      db.Teacher.create({
      username: req.body.username,
      password:req.body.password,
      role:req.body.role,
      name: req.body.name
      }).then(function(dbTeacher) {
        // We have access to the new user record as an argument inside of the callback function
        res.json(dbTeacher);
      }).catch(function(err){
        res.status(500);
        res.json({"ERROR":err.stack});
      });

      });
  });
   
});

//update a teacher

app.put("/admin/api/teachers/:id", function(req, res) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
      req.body.password = hash;
      //update teacher in db
      db.Teacher.update({
      username: req.body.username,
      password:req.body.password,
      role:req.body.role,
      name: req.body.name     
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
  });
});//put ends

//delete a teacher

app.delete("/admin/api/teachers/:id", function(req, res) {
    // We just have to specify which teacher we want to destroy with "where"
    db.Teacher.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTeacher) {
      if(dbTeacher==null || dbTeacher=='undefined')
        res.status(404);
      else
        res.status(204);
      res.json(dbTeacher);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });

  });

//get a single teacher view
app.get("/admin/api/teachers/:id", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Teacher.findById(req.params.id).then(function(dbTeacher) {
      // We have access to the todos as an argument inside of the callback function
      if(dbTeacher==null || dbTeacher=='undefined')
        res.status(404);
      else
        res.status(200);
      res.json(dbTeacher);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });
});


// =============================================================
// classroom routes
// =============================================================
// get all classrooms

app.get("/admin/api/classrooms", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Classroom.findAll({}).then(function(dbClassroom) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbClassroom);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });
});

// add a classroom

app.post("/admin/api/classrooms", function(req, res) {
   // create takes an argument of an object describing the item we want to
   //insert into our table. In this case we just we pass in an object with a text
   // and complete property (req.body)
    db.Classroom.create({
      classnumber: req.body.classnumber,
      grade: req.body.grade,
      TeacherId : req.body.TeacherId
    }).then(function(dbClassroom) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbClassroom);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });
});

//update a classroom

app.put("/admin/api/classrooms/:id", function(req, res) {
    db.Classroom.update({
      classnumber: req.body.classnumber,
      grade: req.body.grade,
      TeacherId : req.body.TeacherId
        }, {
        where: {
            id: req.params.id
        }
        }).then(function(dbClassroom) {
        res.json(dbClassroom);
        }).catch(function(err){
           res.status(500);
           res.json({"ERROR":err.stack});
        });
});

//delete a classroom

app.delete("/admin/api/classrooms/:id", function(req, res) {
    // We just have to specify which teacher we want to destroy with "where"
    db.Classroom.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbClassroom) {
      res.json(dbClassroom);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });

  });

  //get a single classroom
  app.get("/admin/api/classrooms/:id", function(req, res) {
    // findAll returns all entries for a table when used with no options
     db.Classroom.findById(req.params.id).then(function(dbClassroom){
      // We have access to the todos as an argument inside of the callback function
      if(dbClassroom==null || dbClassroom=='undefined')
        res.status(404);
      else
        res.status(200);
      res.json(dbClassroom);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });
});

// =============================================================
// Student Routes
// =============================================================

// get all students

app.get("/admin/api/students", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Student.findAll({}).then(function(dbStudent) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbStudent);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });
});

// add a student

app.post("/admin/api/students", function(req, res) {

  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
      req.body.password = hash;
      //create student in db
      db.Student.create({
      username: req.body.username,
      password:req.body.password,
      name: req.body.name,
      role:req.body.role,
      ClassroomId : req.body.ClassroomId
      }).then(function(dbStudent) {
      // We have access to the new user record as an argument inside of the callback function
      res.json(dbStudent);
      }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
      });

      });
  }); 
    
});

//update a student

app.put("/admin/api/students/:id", function(req, res) {
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
      req.body.password = hash;
      //update the student object
      db.Student.update({
      username: req.body.username,
      password:req.body.password,
      name: req.body.name,
      role:req.body.role,
      ClassroomId : req.body.ClassroomId
        }, {
        where: {
            id: req.params.id
        }
        }).then(function(dbStudent) {
        res.json(dbStudent);
        }).catch(function(err){
           res.status(500);
           res.json({"ERROR":err.stack});
        });

      });//bcrypt.hash ends
  }); //bcrypt.gensalt ends
  
});

//delete a student

app.delete("/admin/api/students/:id", function(req, res) {
    // We just have to specify which teacher we want to destroy with "where"
    db.Student.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbStudent) {
      if(dbStudent==null || dbStudent=='undefined')
        res.status(404);
      else
        res.status(204);
      res.json(dbStudent);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });

  });

//get a single student view
app.get("/admin/api/students/:id", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Student.findById(req.params.id).then(function(dbStudent) {
      // We have access to the todos as an argument inside of the callback function
      if(dbStudent==null || dbStudent=='undefined')
        res.status(404);
      else
        res.status(200);
      res.json(dbStudent);
    }).catch(function(err){
      res.status(500);
      res.json({"ERROR":err.stack});
    });
});



}