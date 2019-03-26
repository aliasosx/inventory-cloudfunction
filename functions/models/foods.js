/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('foods', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    food_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    food_name_en: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    food_photo: {
      type: DataTypes.STRING(500),
      allowNull: false,
      defaultValue: '../../../assets/images/man01.png'
    },
    foodTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    kitchenId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    updatedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    isParent: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    note: {
      type: DataTypes.STRING(1500),
      allowNull: true
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
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'foods'
  });
};
