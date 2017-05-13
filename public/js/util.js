// Fetches student object based on user id
 function getStudentObject(userid,gameover){
  $.get("/admin/api/students/"+userid,function(data){
     console.log(data);
     gameover(data);
  });
};

//Log out function
function logmeout(){
    console.log("I am in logout function");
     $.get("/logout", function(data, status){
        console.log("\nStatus: " + status);
        window.location.reload();
    });
};

//Fetch classroom object assigned for a logged in teacher

//Get the teacher id from user id
function getTeacherObjPerUserId(userid){
  return new Promise(function(resolve, reject){
    $.get("/admin/api/teachers/"+userid,function(data){
        console.log(data);
        resolve(data);
    });
  })
};

//get classroom id from teacher id
function getClassroomObjPerTeacherId(teacherid){
  return new Promise(function(resolve, reject){
    $.get("/admin/api/classrooms/teacher/"+teacherid,function(data){
        console.log(data);
        resolve(data);
    });
  })
};

//

function getStudentObjByStudentId(studentid){
  return new Promise(function(resolve, reject){
    $.get("/admin/api/students/studentid/"+studentid,function(data){
        console.log(data);
        resolve(data);
    });
  })
    
};

//
function getLast7DaysTestsPerClass(classnumber){
    return new Promise(function(resolve, reject){
        $.get("/test/last7Days/"+classnumber,function(data){
            console.log(data);
            resolve(data);
        });
    })
  
};

//
function getAllClassroomsByGrade(grade){
    return new Promise(function(resolve, reject){
        $.get("/admin/api/students/classroom/grades/"+grade,function(data){
            console.log(data);
            resolve(data);
        });
    })
  
};

//get top 3 for grade 1
function getTop3ForGradeOne(){
    return new Promise(function(resolve, reject){
        $.get("http://localhost:3000/test/last7Days/grade1/top3",function(data){
            console.log(data);
            resolve(data);
        });
    })
  
};