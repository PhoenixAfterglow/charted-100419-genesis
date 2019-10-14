module.exports = function(sequelize, DataTypes) {
    const ChartXs = sequelize.define("ChartXs", {
        label: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    ChartXs.associate = function(models) {

        ChartXs.belongsTo(models.Chart, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return ChartXs;
};