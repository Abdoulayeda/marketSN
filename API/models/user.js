/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 19/04/2022 - 23:11:32
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Produit,{
        as: 'produits'
      },{onDelete: 'cascade'})

      models.User.hasMany(models.Commande,{
        as:'commandes'
      })
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    telephone: DataTypes.STRING,
    role: DataTypes.STRING,
    refresh_token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};