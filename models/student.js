"use strict";

module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define("Student", 
  {
    name:{ 
    type: DataTypes.STRING,
    allowNull:false,
      validate:{
        len:[1,50],
        notEmpty:true
      }
    },
    username:{ 
    type: DataTypes.STRING,
    allowNull:false,
      validate:{
        len:[4,20],
        isAlphanumeric: true, 
        notEmpty:true,
        isUnique: function(value, next) {
          Student.find({
            where: {username: value},
            attributes: ['id']
            }).then(function(user) {
              if(user){
              console.log('username already in use!'); 
              return next('username already in use!');
            }
            console.log("username is available");
            next();
            }).catch(function(error){
              console.log(error);
              return next(error);
            });              
        }       
      }
    },
    password:{ 
    type: DataTypes.STRING,
    allowNull:false,
      validate:{
        notEmpty:true       
      }
    },
    role:{ 
    type: DataTypes.STRING,
    allowNull: false,
      validate:{
         notEmpty:true       
      }
    }
  },{

  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  }
  );

  return Student;
};