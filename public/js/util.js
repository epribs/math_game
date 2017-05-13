// Dependencies
var db = require("../models");

//
var getStudentId = function(){
    var studentid = 0;

    if(req.user == null || req.user=='undefined'){

    }else{
       var userid = req.user.id;
       db.Student.findOne({
          where: {UserId: req.user.UserId}
   }).then(function(student){
       studentid = student.id;
   }).catch(function(err)){
       console.log(err.stack);
   }
   return studentid;
   }
};

//get classroom id

var getClassroomId =function(){
    var classroomid = 0;

    if(req.user == null || req.user=='undefined'){

    }else{
       var userid = req.user.id;
       db.Student.findOne({
          where: {UserId: req.user.UserId}
   }).then(function(student){
       ClassroomId = student.ClassroomId;
   }).catch(function(err)){
       console.log(err.stack);
   }
   return ClassroomId;
   }
};

module.exports = {"getStudentId":getStudentId,
                  "getClassroomId": getClassroomId }