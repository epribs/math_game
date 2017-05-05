"use strict";

module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", 
  {
    timestamps: true,
    id:DataTypes.INTEGER,
    username:{ 
      type:DataTypes.STRING,
      validate:{
        isEmail:true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:[6,12],
        notNull:true,
        notEmpty:true
      }
    },
   role:{
      type: DataTypes.INTEGER,
      validate:{
        notNull:true,
        notEmpty:true,
        isNumeric:true
      },
    }
  },
  
      {
    classMethods: {
    associate: function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      users.belongsTo(models.student, {
        onDelete: "cascade"
      });
    //user has one teacher record
       users.belongsTo(models.teacher, {
        onDelete: "cascade"
      });
    }
   }
   }
 );
  return users;
};
