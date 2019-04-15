/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    barcode: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: false
    },
    product_code: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: true
    },
    photo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: false
    },
    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    product_description: {
      type: DataTypes.STRING(255),
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

    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    minimum: {
      type: DataTypes.INTEGER(11),
    },
    currentQuantity: {
      type: DataTypes.INTEGER(11),
    },
    foodId: {
      type: DataTypes.INTEGER(11),
    },
    currencyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'currencies',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    },
    supplierId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'suppliers',
        key: 'id'
      }
    },
    unitId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'units',
        key: 'id'
      }
    },
    expireDate: {
      type: DataTypes.DATEONLY,
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
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
      tableName: 'products'
    });
};
