module.exports = function(sequelize, DataTypes) {
    const ChartXs = sequelize.define("ChartXs", {
        xsName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order: {
            type: DataTypes.INTEGER,
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