/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('units', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    unit_name: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    unit: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    quantityPerUnit: {
      type: DataTypes.INTEGER(11),
      allowNull: false
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
    enabled: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
      tableName: 'units'
    });
};
