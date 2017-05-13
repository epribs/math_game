// Dependencies
var db = require("../models");
// =============================================================
// leaderboard Routes 
// =============================================================
module.exports = function(app) {

//get all classrooms which belongs to grade 1

app.get("/admin/api/students/classroom/grades/:grade", function(req, res) {
    
  db.Classroom.findAll({
      where: {grade : req.params.grade}
    }).then(function(dbClassroom){
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

//get all tests which contains above classrooms



}//end of module.exports