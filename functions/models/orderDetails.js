/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('orderDetails', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    foodId: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    subfoodId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    foodName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cost: {
      type: "DOUBLE",
      allowNull: true
    },
    price: {
      type: "DOUBLE",
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    total_price: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    total_cost: {
      type: DataTypes.INTEGER(11),
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
    }
  }, {
      tableName: 'orderDetails'
    });
};
