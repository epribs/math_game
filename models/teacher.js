"use strict";

module.exports = function(sequelize, DataTypes) {
  var teacher = sequelize.define("teacher", 
  {
    timestamps: true,
    id:DataTypes.INTEGER,
    name:{ 
    type: DataTypes.STRING,
      validate:{
        len:[1,50],
        notNull:true,
        notEmpty:true,
        isAlpha:true
      }
    }
   },
    {
    classMethods: {
    associate: function(models) {
    
      // teacher has many classrooms
      teacher.hasMany(models.classroom, {
        //onDelete: "cascade"
      });

      //teacher has many students
      teacher.hasMany(models.student, {
        //onDelete: "cascade"
      });
     
     //teacher has many tests
      teacher.hasMany(models.test, {
        //onDelete: "cascade"
      });
    }
    }
  }
 );
  return teacher;
};

