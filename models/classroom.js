"use strict";

module.exports = function(sequelize, DataTypes) {
  var Classroom = sequelize.define("Classroom", {
     // timestamps: true,
    //id:DataTypes.INTEGER,
    classnumber:{ 
      type:DataTypes.INTEGER,
      validate:{
        isNumeric:true,
        notNull:true,
        notEmpty:true
      }
    },
    grade:{ 
      type:DataTypes.INTEGER,
      validate:{
        isNumeric:true       
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
      // A classroom has one teacher
      Classroom.belongsTo(models.Teacher, {
      foreignKey: {
      //allowNull: false
      }
    });
    
     // A classroom has many students
      Classroom.hasMany(models.Student, {
      foreignKey: {
      //allowNull: false
      }
    });

  // A classroom has many tests
      Classroom.hasMany(models.Test, {
      foreignKey: {
      //allowNull: false
      }
      });
    }
    }
 }
 );
return Classroom;
};
