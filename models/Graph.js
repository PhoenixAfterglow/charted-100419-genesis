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
                allowNull: false
            }
        });
        Graph.hasMany(models.DataXYPair, {
            foreignKey: {
                allowNull: false
            }
        })
    };

    return Graph;
};