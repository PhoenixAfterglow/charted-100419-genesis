module.exports = function(sequelize, DataTypes) {
    const Graph = sequelize.define("Graph", {
        graphLabel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        xName: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    Graph.associate = function(models) {

        Graph.belongsTo(models.ChartCollection, {
            foreignKey: {
                allowNull: false,
                onDelete: "cascade",
                onUpdate: "cascade"
            }
        });
        Graph.hasMany(models.DataXYPair, {
            onDelete: "cascade",
            onUpdate: "cascade",
            foreignKey: {
                allowNull: false
            }
        })
    };

    return Graph;
};