// Game will have a fixed number of problems (20) within a fixed amount of time (1:00)
// starts to count down timer, which is visible
// Problems will be randomly generated, numbers will only be 1-10 and displayed in
// 
// WELCOME PAGE
// User will log in, teachers and students use same log in form(ajax call)
// Page will change to the game screen or report after clicking Submit button,
// depending on user credentials/role
// 
// 
// DURING GAME 
// Once customer has logged in, a modal will appear with a Start button, 
// User will press Start button(startButton)
// At .onclick of start button, 1st problem and count down timer will be displayed
// User will answer question in input form, press ENTER or click Submit button
// When any question is answered, problemsRemainingBar will move down, until end of game
// and will count up when answer is submitted.
// If answer is correct,  correctBar will move up with problemsRemainingBar
// else, correctBar doesn't move
// 
// 
// END OF GAME 
// Once game is over, results from rightAnswer, wrongAnswer vars
// Once game is over, show resultsWindow, will cover progressPanel and 
// If answer is correct, show results in the correctResults
// If answer is incorrect, show results in the incorrectResults
// If the session ends by time out, data is still saved. 
