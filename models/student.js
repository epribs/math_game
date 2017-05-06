"use strict";

module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define("Student", 
  {
    // timestamps: true,
    //id:DataTypes.INTEGER,
    name:{ 
    type: DataTypes.STRING,
      validate:{
        len:[1,50],
        notNull:true,
        notEmpty:true,
        isAlpha:true
      }
    },
    username:{ 
    type: DataTypes.STRING,
      validate:{
        len:[4,20],
        notNull:true,
        notEmpty:true,
        isAlpha:true
      }
    },
    password:{ 
    type: DataTypes.STRING,
      validate:{
        len:[4,20],
        notNull:true,
        notEmpty:true,
        isAlpha:true
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
   // A student has many tests
      Student.hasMany(models.Test, {
      foreignKey: {
       //allowNull: false
      }
    });
    // A student has one classroom
      Student.belongsTo(models.Classroom, {
      foreignKey: {
      allowNull: false
      }
    });
  // // A student has one teacher
  //     Student.belongsTo(models.Teacher, {
  //     foreignKey: {
  //     allowNull: false
  //     }
  //     });
    // // A student has one user
    //   Student.belongsTo(models.User, {
    //   foreignKey: {
    //   allowNull: false
    //   }
    //   });
    
    
    },
  }
  }
  );

  return Student;
};