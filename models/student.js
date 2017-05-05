"use strict";

module.exports = function(sequelize, DataTypes) {
  var student = sequelize.define("student", 
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
   // A teacher (foreignKey) is required or a class cannot exist
      student.hasMany(models.test, {
      foreignKey: {
       //allowNull: false
      }
    });
    // A classroom can have many students
      student.belongsTo(models.classroom, {
      foreignKey: {
      allowNull: false
      }
    });
  // A teacher (foreignKey) is required or a class cannot exist
      student.belongsTo(models.teacher, {
      foreignKey: {
      allowNull: false
      }
      });
    
    
    },
  }
  }
  );

  return student;
};