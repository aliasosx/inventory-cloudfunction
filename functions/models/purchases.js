/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('purchases', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    billNo: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    billRefno: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: sequelize.fn('uuid')
    },
    billAmount: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    billDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: sequelize.fn('curdate')
    },
    billPhoto: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    supplierId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'suppliers',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    approved: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    approveBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    approveNameBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    approvedDate: {
      type: DataTypes.DATE,
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
      tableName: 'purchases'
    });
};
