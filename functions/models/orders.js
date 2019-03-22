/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: DataTypes.STRING(36),
      allowNull: true,
      unique: true
    },
    refno: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    qrRefno: {
      type: DataTypes.STRING(12),
      allowNull: true,
      unique: true
    },
    invoiceno: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    ticket: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    grandtotal: {
      type: "DOUBLE",
      allowNull: true
    },
    recieved: {
      type: "DOUBLE",
      allowNull: true
    },
    change: {
      type: "DOUBLE",
      allowNull: true
    },
    paymentType: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    orderDateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    orderFinishTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    settled: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    completed: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    userId: {
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
    tableName: 'orders'
  });
};
