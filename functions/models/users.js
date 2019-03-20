/* jshint indent: 2 */
const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    employee_code: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: true,
      defaultValue: Sequelize.UUIDV4
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    dateOfbirth: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    employed_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    photo: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    enabled: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
    firstlogin: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
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
      tableName: 'users'
    });
};
