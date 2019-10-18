module.exports = function(sequelize, DataTypes) {
    const ChartCollection = sequelize.define("ChartCollection", {
        chartName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    ChartCollection.associate = function(models) {

        ChartCollection.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        ChartCollection.hasMany(models.Graph, {
            onDelete: "cascade",
            onUpdate: "cascade",
            foreignKey: {
                allowNull: false

            }
        })
    };

    return ChartCollection;
};