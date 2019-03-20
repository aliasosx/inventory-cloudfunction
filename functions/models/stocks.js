/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('stocks', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    stock_refno: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true
    },
    productId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      unique: true
    },
    previous_quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    used_quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    current_quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    minimum_quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    remarks: {
      type: DataTypes.STRING(255),
      allowNull: true
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
      tableName: 'stocks'
    });
};
