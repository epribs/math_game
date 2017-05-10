// Dependencies
var db = require("../models");
var passport = require("passport");
var bcrypt = require("bcryptjs");
var LocalStrategy = require("passport-local").Strategy;
// =============================================================
// Student Routes 
// =============================================================
module.exports = function(app) {

// =============================================================
// successful student login user will be directed to student homepage
// =============================================================
app.get("/student", function(req, res) {
  //check if teacher object exists redirect to corresponding teacher homepage else login screen
  res.render("student");
});


// =============================================================
// student login post form route using passport authentication
// =============================================================

//create a local strategy i.e. validation logic goes here
passport.use('student',new LocalStrategy(

  function(username, password, done) {

    db.Student.findOne({ where: {username: username} }).then(function(dbStudent) {
       if(dbStudent==null || dbStudent=='undefined'){
         return done(null, false, { message: 'Incorrect username.' });      
       }else{
         bcrypt.compare(password,dbStudent.password,function(err,isMatch){
            if(err) throw err; 
            if(isMatch){
                return done(null, dbStudent);     
            }else{
                return done(null, false, { message: 'Invalid password.' });     
            }
         });
       }
    })
    .catch(function(err){
      return done(null, false, { message: 'Unknown Error:'+ err.stack}); 
    });
 }
));

// post form route which will use local strategy logic 
app.post("/student",passport.authenticate('student',{successRedirect:'/student',failureRedirect: '/',failureFlash:true}), function(req, res) {
    res.redirect('/student');
});

// passport.serializeUser(function(user, done) {
//    // serialize user
//    if(user.role === "student")
//      done(null, user.id);
//    else if(user.role === "teacher"){
//       done(null, user.id);
//    }
// });

// passport.deserializeUser(function(id, done) {
//    db.Student.findById(id, function(err,user) {
//         if (err) return done(err);
//         if (user) return done(null, user);
//          db.Teacher.findById(id, function(err, user) {
//             done(err, user);
//         });
//     });
// });


/**********************************************************************************************/
 // =============================================================
// successful teacher login user will be directed to teacher homepage
// =============================================================
app.get("/teacher", function(req, res) {
  //check if teacher object exists redirect to corresponding teacher homepage else login screen
  res.render("teacher",{"teacherName": "testing"});
});

// =============================================================
// teacher login post form route using passport authentication
// =============================================================

//create a local strategy i.e. validation logic goes here
passport.use("teacher",new LocalStrategy(

  function(username, password, done) {

    db.Teacher.findOne({ where: {username: username} }).then(function(dbTeacher) {
       console.log(dbTeacher);
       if(dbTeacher==null || dbTeacher=='undefined'){
          return done(null, false, { message: 'Incorrect username.' });      
       }else{
          bcrypt.compare(password,dbTeacher.password,function(err,isMatch){
            if(err) throw err; 
            if(isMatch){
                return done(null, dbTeacher);     
            }else{
                return done(null, false, { message: 'Invalid password.' });     
            }
         });
       }
    })
    .catch(function(err){
      return done(null, false, { message: 'Unknown Error:'+ err.stack}); 
    });
 }
));

// post form route which will use local strategy logic 
app.post("/teacher",passport.authenticate('teacher',{successRedirect:'/teacher',failureRedirect: '/',failureFlash:true}), function(req, res) {
    res.redirect('/teacher');
});

// passport.serializeUser(function(user, done) {
//    // serialize user
//      done(null, user.id);
  
// });

// passport.deserializeUser(function(id, done) {
//     db.Teacher.findById(id).then(function(user) {
//       done(null, user);
//     })
//     .catch(function(err){
//       done(err, null);
//     });
    
// });

passport.serializeUser(function(user, done) {
   // serialize user
   if(user.role === "student")
     done(null, user.id);
   else if(user.role === "teacher"){
      done(null, user.id);
   }
});

passport.deserializeUser(function(id, done) {
   db.Teacher.findById(id).then(function(user) {
      if (user) return done(null, user);
      db.Student.findById(id).then(function(user) {
        if (user) return done(null, user);
      });
    })
    .catch(function(err){
      done(err, null);
    });


});


}//app module.exports ends here