// Add a flag for the text attribute to prevent this field from being null

// Add a validation for the text attribute to make sure it's at least one character,
// but no more than 140 characters

// Add a flag for complete so that it's false by default if not given a value

module.exports = function(sequelize, DataTypes) {
    const Data = sequelize.define("Data", {
      column_x_value: {
        type: DataTypes.STRING,
        allowNull: false
      },
      column_y_value: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Data.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Data.belongsTo(models.Chart, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Data;
  };