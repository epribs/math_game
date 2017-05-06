"use strict";
//Add foreign key student_id and classroom_id
module.exports = function(sequelize, DataTypes) {
  var Test = sequelize.define("Test", {
    //id:DataTypes.Integer,
     // timestamps: true,
    name:{ 
      type:DataTypes.STRING,
      validate:{
        isAlpha:true,
        isNumeric:true,
        notNull:true,
        notEmpty:true
      }
    },
     totalQuestions:{ 
      type:DataTypes.INTEGER,
      validate:{
        isNumeric:true       
      }
    },
     correctQuestions:{ 
      type:DataTypes.INTEGER,
      validate:{
        isNumeric:true       
      }
    },
     totalTimeTaken:{ 
      type:DataTypes.FLOAT,
      validate:{
        isFloat:true       
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
    //A test report is associates with one student
      Test.belongsTo(models.Student, {
        //onDelete: "cascade"
      });
    //A test report is associated to one classroom
      Test.belongsTo(models.Classroom, {
        //onDelete: "cascade"
      });
    }
   }
   }
 );

  return Test;
};
