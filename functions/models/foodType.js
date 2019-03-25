/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('foodType', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    foodTypeName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    foodTypeNameEn: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    enabled: {
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
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'foodType'
  });
};
