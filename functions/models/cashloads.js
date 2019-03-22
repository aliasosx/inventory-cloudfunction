/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('cashloads', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    loadDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    initBalance: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    openAuthorizedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    loadApproved: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    refno: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true
    },
    eodCashBalance: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    eodBankBalance: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    cashBalance: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    cashInHands: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    closeBalance: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    totalSellAmount: {
      type: "DOUBLE",
      allowNull: false,
      defaultValue: '0'
    },
    closed: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    closeDatetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    closedby: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    staff: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    closeAuthorizedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    closeApproved: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    note: {
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
    }
  }, {
      tableName: 'cashloads'
    });
};
