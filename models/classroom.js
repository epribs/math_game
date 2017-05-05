"use strict";

module.exports = function(sequelize, DataTypes) {
  var classroom = sequelize.define("classroom", {
    id:DataTypes.Integer,
    classnumber:{ 
      type:DataTypes.INTEGER,
      validate:{
        isNumeric:true,
        notNull:true,
        notEmpty:true
      }
    },
    grade:{ 
      type:DataTypes.Integer,
      validate:{
        isNumeric:true       
      }
    }
  },{
    classMethods: {
      associate: function(models) {
      // A teacher (foreignKey) is required or a class cannot exist
      classroom.belongsTo(models.teacher, {
      foreignKey: {
      allowNull: false
      }
    });
    
     // A classroom can have many students
      classroom.hasMany(models.student, {
      foreignKey: {
      allowNull: false
      }
    });

  // A teacher (foreignKey) is required or a class cannot exist
      classroom.hasMany(models.test, {
      foreignKey: {
      //allowNull: false
      }
      });
    }
    }
 }
 );
return classroom;
};
