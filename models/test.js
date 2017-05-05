"use strict";
//Add foreign key student_id and classroom_id
module.exports = function(sequelize, DataTypes) {
  var test = sequelize.define("test", {
    id:DataTypes.Integer,
    name:{ 
      type:DataTypes.String,
      validate:{
        isAlpha:true,
        isNumeric:true,
        notNull:true,
        notEmpty:true
      }
    },
     totalQuestions:{ 
      type:DataTypes.Integer,
      validate:{
        isNumeric:true       
      }
    },
     correctQuestions:{ 
      type:DataTypes.Integer,
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
  },
      {
    classMethods: {
    associate: function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      test.belongsTo(models.student, {
        //onDelete: "cascade"
      });
    //test has one classroom
      test.belongsTo(models.classroom, {
        //onDelete: "cascade"
      });
    }
   }
   }
 );

  return test;
};
