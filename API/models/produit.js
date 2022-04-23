/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 19/04/2022 - 23:10:19
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
  class Produit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Produit.belongsTo(models.Categorie,{
        foreignKey: 'CategorieId',
        as: 'categorie'
      })
      models.Produit.belongsTo(models.User,{
        foreignKey: 'UserId',
        as: 'user'
      })

      models.Produit.belongsToMany(models.Commande,
         {through: 'produit-commande'}
       )
    }
  }
  Produit.init({
    nom: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    prix: DataTypes.INTEGER,
    quantite: DataTypes.INTEGER,
    actif: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Produit',
  });
  return Produit;
};