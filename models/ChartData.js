// Add a flag for the text attribute to prevent this field from being null

// Add a validation for the text attribute to make sure it's at least one character,
// but no more than 140 characters

// Add a flag for complete so that it's false by default if not given a value

module.exports = function(sequelize, DataTypes) {
    const ChartData = sequelize.define("ChartData", {
        ysValue: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    ChartData.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        ChartData.belongsTo(models.ChartXs, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return ChartData;
};