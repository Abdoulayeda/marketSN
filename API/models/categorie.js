/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 19/04/2022 - 23:09:00
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
  class Categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Categorie.hasMany(models.Produit,{
        as: 'produits'
      })
      
    }
  }
  Categorie.init({
    nom: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categorie',
  });
  return Categorie;
};