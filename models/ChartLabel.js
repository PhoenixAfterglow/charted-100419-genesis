module.exports = function(sequelize, DataTypes) {
    const ChartLabel = sequelize.define("ChartLabel", {
        label: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    ChartLabel.associate = function(models) {

        ChartLabel.belongsTo(models.Chart, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return ChartLabel;
};