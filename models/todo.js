module.exports = function(sequelize, DataTypes) {
  var Todo = sequelize.define("Todo", {
    text: {
      type: DataTypes.STRING,
      validate: {
      notEmpty: true,           // don't allow empty strings
      len: [1,140]                // only allow values                 

       // custom validations are also possible:
      isEmpty: function(text) {
        if(text==="" || text===" ") {
          throw new Error('Empty strings not allowed')
        // we also are in the model's context here, so this.otherField
        // would get the value of otherField if it existed
        }
      }
      }
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue:false,
    }
  });
  return Todo;
};
