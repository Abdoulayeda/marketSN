/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 19/04/2022 - 23:03:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prix: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      quantite: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      actif: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      CategorieId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Categories',
          key: 'id'
        }
      },
      UserId: { 
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Produits');
  }
};