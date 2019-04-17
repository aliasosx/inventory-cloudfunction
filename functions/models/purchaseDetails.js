/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('purchaseDetails', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    purchaseId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'purchases',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    price: {
      type: "DOUBLE",
      allowNull: true,
      defaultValue: '0'
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    unitId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    total: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '(`price` * `quantity`)'
    },
    remarks: {
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
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'purchaseDetails'
  });
};
