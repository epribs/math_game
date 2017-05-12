"use strict";

module.exports = function(sequelize, DataTypes) {
  var Classroom = sequelize.define("Classroom", {
     // timestamps: true,
    //id:DataTypes.INTEGER,
    classnumber:{ 
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        isNumeric:true,
        notEmpty:true
      }
    },
    grade:{ 
      type:DataTypes.INTEGER,
      allowNull: false,
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
return Classroom;
};
