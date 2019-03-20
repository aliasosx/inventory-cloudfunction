/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('warehouses', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    locationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'locations',
        key: 'id'
      }
    },
    warehouse_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    warehouse_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'warehouses'
  });
};
