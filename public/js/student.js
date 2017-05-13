//Need ajax get call to load form  with questions for students to take a test
//Need ajax post call to submit the test result to path /student/test route with following body payload
//  testname, totalQuestions,correctQuestions,wrongQuestions,ClassroomId,StudentId
// ///////////// VARIABLES ///////////////////////

var firstNumber = 0;
var secondNumber = 0;
var operand = "+"

var problemId = 0;

var secondsLeft = 60;

var answer = 0;
var corretcAnsw = 0;
var wrongAnsw = 0;

var finalResult = {
	StudentId: ""
};


$(document).ready(function(){
// ==> FUNCTIONS FOR THE START BUTTON EVENT
function hideMask(){
	$("#mask").css("display", "none");
}
function displayProblem(){
	firstNumber = Math.floor(Math.random()*10);
	secondNumber = Math.floor(Math.random()*11);
	$("#firstNumber").html("&nbsp;&nbsp;" + firstNumber);
	$("#secondNumber").html(secondNumber);
	problemId ++;
	console.log("check:" + problemId);
}
// function timerUp(){
// 	setTimeout(gameOver,60*1000);
// }
var oneMinute;
//timerup
function timerUp(){
	// call back to gamover 
	var userid = $("#userid").html();
    console.log(userid);
	//getStudentObject(userid,gameOver);
	oneMinute =setTimeout(function() {
    getStudentObject(userid,gameOver);
}, 60 * 1000);
}
//stop timer
function stopTimerUp(){
	clearTimeout(oneMinute);
}
// function showMaskGameOver(){

// 	$("#maskGameOver").css("display", "block");
// }
function gameOver(studentObj){
	// $("body").html("GAME OVER");
	//var userid = $("#userid").html();
	//console.log(userid);
	console.log("game over");
	//console.log("user sesssion object "+ user);
	finalResult.name="Addition"
	finalResult.correctQuestions = corretcAnsw;
	finalResult.wrongQuestions = wrongAnsw;
	finalResult.totalQuestions = 20;
    finalResult.StudentId = studentObj.id;
	finalResult.ClassroomId = studentObj.ClassroomId;
	console.log(finalResult);
	// showMaskGameOver();
	postTestResult();

}

 // This function does an API call to POST the test results to database
  function postTestResult(){
    $.ajax({
      method: "POST",
	  dataType:"json",
      url: "/test",
	  data: finalResult
    })
    .done(function() { 
      console.log("you have successfully submitted your test results, you will be logged out! Thank you!");
      logmeout();   
    });
  };

  //countDown
var countDown = setInterval(displayCountdown, 1000);
function displayCountdown(){
	secondsLeft --;
	if(secondsLeft > 9){
		$("#timer").html("0:" + secondsLeft);
	} else if(secondsLeft < 10 && secondsLeft >= 0){
			$("#timer").html("0:0" + secondsLeft);
		} else {
		stopCountdown();
		}
}
 function stopCountdown(){
	 clearInterval(countDown);
 }
 // EVERYTHING IS TRIGGER HERE!!!!!!
$("#roundButtonContainer").click(function(){
	hideMask();
	displayProblem();
	timerUp();
})
// ==> FUNCTIONS FOR THE ENTER KEY
function nextProblem(){
	if(problemId < 20){
		displayProblem();
	} else {
        // call back to gamover 
	    var userid = $("#userid").html();
        console.log(userid);
		getStudentObject(userid,gameOver);
		//gameOver();
		//stopTimerUp();
	}
}
function checkanswer(){
	answer = $("#problemAnswer").val();
	var result = firstNumber + secondNumber;
	if (answer == result){
		corretcAnsw ++;
	}else {
		wrongAnsw ++;
	}
	console.log("your rights: " + corretcAnsw);
	console.log("your wrongs: " +  wrongAnsw);
	console.log("Problems Left: " + (20 - problemId) );
}
$("#problemAnswer").on("keydown", function(keyPressed) {
   if (keyPressed.keyCode == 13) {
		 keyPressed.preventDefault();
		 checkanswer();
		 $("#problemAnswer").val("");
		 nextProblem();
   }
  });
}); // END OF GET READY FUNCTION
