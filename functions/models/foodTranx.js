/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('foodTranx', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    foodId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'foods',
        key: 'id'
      },
      unique: false
    },
    subfoodId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    cost: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    price: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    currencyId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'currencies',
        key: 'id'
      }
    },
    discountId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    updateById: {
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
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
      tableName: 'foodTranx'
    });
};
