module.exports = function(sequelize, DataTypes) {
    const DataXYPair = sequelize.define("DataXYPair", {
        // NOTE: Overriding default ID line 6, also using this ID for order #.
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        xValue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        yValue: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });

    DataXYPair.associate = function(models) {


        DataXYPair.belongsTo(models.Graph, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return DataXYPair;
};