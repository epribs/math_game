// Dependencies
var db = require("../models");
var passport = require("passport");
var bcrypt = require("bcryptjs");
var LocalStrategy = require("passport-local").Strategy;

module.exports = function(app) {

//=============================================================
// user login post form route using passport authentication
// =============================================================

//create a local strategy i.e. validation logic goes here
passport.use('user',new LocalStrategy(

  function(username, password, done) {

    db.Users.findOne({ where: {username: username} }).then(function(dbUser) {
       if(dbUser==null || dbUser=='undefined'){
         return done(null, false, { message: 'Incorrect username.' });      
       }else{
         bcrypt.compare(password,dbUser.password,function(err,isMatch){
            if(err) throw err; 
            if(isMatch){
                return done(null, dbUser);     
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

// =============================================================
// successful user login user will be directed to student/teacher homepage
// =============================================================
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated())
    return next();
  else
    res.redirect('/');
}

app.get("/user", ensureAuthenticated,function(req, res) {
  //check if user is student or teacher to display appropriate handlebar view
  if(req.user.role == "teacher"){
    res.render("teacher",{ user: req.user });
  }else if (req.user.role == "student"){
    res.render("student",{ user: req.user });
  }else{
    res.render("index");
  }
  
});

// post form route which will use local strategy logic 
app.post("/user",passport.authenticate('user',{successRedirect:'/user',failureRedirect: '/',failureFlash:true}), function(req, res) {
    res.redirect('/user');
});

passport.serializeUser(function(user, done) {
   // serialize user
   done(null, user.id);
});

passport.deserializeUser(function(id, done) {
   db.Users.findById(id).then(function(user) {
      if (user) return done(null, user);
      db.Users.findById(id).then(function(user) {
        if (user) return done(null, user);
      });
    })
    .catch(function(err){
      done(err, null);
    });
});

//


}//app module.exports ends here

