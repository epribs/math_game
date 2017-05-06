"use strict";

module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define("Teacher", 
  {
    // timestamps: true,
    //id:DataTypes.INTEGER,
    name:{ 
    type: DataTypes.STRING,
    allowNull: false,
      validate:{
        len:[1,100],
        notEmpty:true
      }
    },
    username:{ 
    type: DataTypes.STRING,
    allowNull: false,
      validate:{
        len:[1,50],
        notEmpty:true,
        isUnique: function(value, next) {
                  Teacher.find({
                    where: {username: value},
                    attributes: ['id']
                   }).then(function(user) {
                      if(user){
                      console.log('Email address already in use!'); 
                      return next('Email address already in use!');
                    }
                    console.log("username can be added");
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
    allowNull: false,
      validate:{
        len:[1,50],
        notEmpty:true       
      }
    }
   },{

  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  },
    {
    classMethods: {
    associate: function(models) {
    
      // Teacher has many classrooms
      Teacher.hasMany(models.Classroom, {
        //onDelete: "cascade"
      });

      // //Teacher has many students
      // Teacher.hasMany(models.Student, {
      //   //onDelete: "cascade"
      // });
     
     // //Teacher has many tests
     //  Teacher.hasMany(models.Test, {
     //    //onDelete: "cascade"
     //  });

      // A teacher has one user
      // Teacher.belongsTo(models.User, {
      // foreignKey: {
      // allowNull: false
      // }
      // });
    }
    }
  }
 );
  return Teacher;
};

