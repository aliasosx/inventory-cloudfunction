/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kitchens', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    kitchenName: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    kitchenCode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    enabled: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'kitchens'
  });
};
