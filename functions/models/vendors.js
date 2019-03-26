/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vendors', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vendorCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    vendorName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    contactId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'contacts',
        key: 'id'
      }
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    enabled: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    tableName: 'vendors'
  });
};
