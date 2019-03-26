/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subfoods', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    subFoodName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    subFoodNameEn: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    enabled: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'subfoods'
  });
};
