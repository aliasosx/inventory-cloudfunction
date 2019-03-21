/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menus', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    menu_order: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    menu_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    menu_link: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
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
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'menus'
  });
};
