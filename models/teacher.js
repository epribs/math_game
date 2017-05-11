"use strict";

module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define("Teacher", 
  {
   name:{ 
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
        len:[1,100],
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

  return Teacher;
};

