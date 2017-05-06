  "use strict";

  module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", 
    {
      //timestamps: true,
    // id:DataTypes.INTEGER,
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
    },  {

  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  },
    {
      classMethods: {
      associate: function(models) {
        
        // user is associated to one student
        User.belongsTo(models.Student, {
          onDelete: "cascade"
        });
      //user has one teacher record
        User.belongsTo(models.Teacher, {
          onDelete: "cascade"
        });
      }
    }
    }
  );
    return User;
  };
