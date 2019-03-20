/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('suppliers', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    supplier_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    contactId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'contacts',
        key: 'id'
      }
    },
    enabled: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')
    },
    udpatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'suppliers'
  });
};
