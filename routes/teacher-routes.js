// Dependencies
var db = require("../models");
var passport = require("passport");
var bcrypt = require("bcryptjs");
var LocalStrategy = require("passport-local").Strategy;
// =============================================================
// Teacher Routes 
// =============================================================
module.exports = function(app) {

// =============================================================
// successful teacher login user will be directed to teacher homepage
// =============================================================
app.get("/teacher", function(req, res) {
  //check if teacher object exists redirect to corresponding teacher homepage else login screen
  res.render("teacher");
});

// =============================================================
// teacher login post form route using passport authentication
// =============================================================

//create a local strategy i.e. validation logic goes here
passport.use(new LocalStrategy(

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
app.post("/teacher",passport.authenticate('local',{successRedirect:'/teacher',failureRedirect: '/',failureFlash:true}), function(req, res) {
    res.redirect('/teacher');
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    db.Teacher.findById(id).then(function(user) {
      done(null, user);
    })
    .catch(function(err){
      done(err, null);
    });
    
});

 
}//app module.exports ends here