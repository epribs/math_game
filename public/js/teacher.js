
$(document).ready(function(){
//dashboard ui control
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
}

//get the session object
 var uid = $("#teacherid").html();
 console.log(uid);

 //display class result 

var displayWeeklyClassResults = function(){

    getTeacherObjPerUserId(uid).then(function(teacherObj){

          console.log(teacherObj);
          getClassroomObjPerTeacherId(teacherObj.id).then(function(classObj){
                console.log(classObj);
                getLast7DaysTestsPerClass(classObj.classnumber).then(function(dbTests){
                  console.log(dbTests);
                  $.each(dbTests, function(i, item) {
                       var testObj = dbTests[i];
                       console.log(testObj);
                        getStudentObjByStudentId(testObj.StudentId).then(function(studentObj){
                           addclassrow(testObj,studentObj);
                        }).catch(function(err){
                           console.log("ERROR: "+ (err.stack));
                        });
                      
                  });
           }).catch(function(err){
      console.log("ERROR: "+ (err.stack));
    });
           
      }).catch(function(err){
      console.log("ERROR: "+ (err.stack));
    });
      
    }).catch(function(err){
      console.log("ERROR: "+ (err.stack));
    });


}; //End of displayWeeklyClassResults

//---------------------------------------------------------------------------------------------------------//
//Display Grade Dashboard
//---------------------------------------------------------------------------------------------------------//
//display class result 

var displayWeeklyGradeResults = function(){

     getTop3ForGradeOne().then(function(dbTests){
              console.log(dbTests);
                  $.each(dbTests, function(i, item) {
                       var testObj = dbTests[i];
                       console.log(testObj);
                        getStudentObjByStudentId(testObj.StudentId).then(function(studentObj){
                           addgraderow(testObj,studentObj,i);
                        }).catch(function(err){
                           console.log("ERROR: "+ (err.stack));
                        });
                      
                  });
           }).catch(function(err){
      console.log("ERROR: "+ (err.stack));
    });

}; //End of display grade leaderboard

//addclassrow function
var addclassrow = function(testObj,studentObj,i){
    var html = '<tr>' + '<td>' + studentObj['name'] + '</td>' + 
               '<td>' + testObj['name']  + '</td>' + 
               '<td>' + testObj['correctQuestions'] + ' out of '+ '20' + '</td>' + 
               '<td>' + testObj['wrongQuestions'] + '</td>' + 
               '</tr>';
    $(html).appendTo($("#classleaderbrd"));

};

//addgraderow function
var addgraderow = function(testObj,studentObj,i){
    var html =   '<tr>' +'<td>' + i + '</td>' + 
               '<td>' + studentObj['name'] + '</td>' + 
               '<td>' + testObj['name']  + '</td>' + 
               '<td>' + testObj['correctQuestions'] + ' out of '+ '20' + '</td>' + 
               '</tr>';
    $(html).appendTo($("#gradeleaderboard"));

};

//

displayWeeklyClassResults();
displayWeeklyGradeResults();
                 

}); // END OF GET READY FUNCTION