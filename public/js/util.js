//
 function getStudentObject(userid,gameover){
  $.get("/admin/api/students/"+userid,function(data){
     console.log(data);
     gameover(data);
  });
};

// //get classroom id

// function getClassroomId(userid){
//     $.get("/admin/api/students/"+userid,function(data){
//      console.log(data);
//      return data.ClassroomId;

//   });
// };

function logmeout(){
    console.log("I am in logout function");
     $.get("/logout", function(data, status){
        console.log("\nStatus: " + status);
        window.location.reload();
    });
};
