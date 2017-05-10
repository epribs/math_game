"use strict";
//Add foreign key student_id and classroom_id
module.exports = function(sequelize, DataTypes) {
  var Test = sequelize.define("Test", {
    //id:DataTypes.Integer,
     // timestamps: true,
    name:{ 
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
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
     wrongQuestions:{ 
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

  }
 );
 return Test;
};
