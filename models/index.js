'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Define Associations
//db.Classroom.belongsTo(db.Teacher,{foreignKey:'tid',targetKey:'id'});
db.Classroom.hasMany(db.Student,{constraints: false});
db.Classroom.hasMany(db.Test,{constraints: false});
//db.Student.belongsTo(db.Classroom,{foreignKey:'classid',targetKey:'id'});
db.Student.hasMany(db.Test);
db.Teacher.hasMany(db.Classroom);
//db.Teacher.belongsTo(db.User);
//db.Student.belongsTo(db.User);
db.User.hasMany(db.Student,{onDelete:'CASCADE',hooks:true});
db.User.hasMany(db.Teacher,{onDelete:'CASCADE',hooks:true});

module.exports = db;
