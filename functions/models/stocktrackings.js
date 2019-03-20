/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stocktrackings', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    stockId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sourceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'sources',
        key: 'id'
      }
    },
    previous_quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    used_quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    current_quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
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
    tableName: 'stocktrackings'
  });
};
