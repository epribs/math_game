//Need ajax get call to load form  with questions for students to take a test
var util = require("./util.js");

var StudentId = util.getStudentId;
var ClassroomId = util.getClassroomId;
console.log("Student ID is : "+ StudentId);
console.log("Classroom ID is : "+ ClassroomId);






//Need ajax post call to submit the test result to path /student/test route with following body payload
//  testname, totalQuestions,correctQuestions,wrongQuestions,ClassroomId,StudentId
