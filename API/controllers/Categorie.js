/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 20/04/2022 - 01:05:28
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
const models = require('../models')
module.exports = {
 
    getallcategories: async (req, res) =>{
       try {
           const categories= await models.Categorie.findAll();
           return res.json(categories)
           }catch(error){
             return res.status(404).json({message: "Pas de categories"})
           }
    },

    createCategorie: async (req, res)=>{
        const nom = req.body.nom
        try {
           await models.Categorie.create({
               nom: nom,
               createdAt: new Date(),
               updatedAt: new Date()
           });
           res.json({message:"Categorie créer avec succes"})
        }catch(error){
          console.log(error)
        }
    },


    categorie: async (req, res)=>{
      models.Categorie.findByPk(req.params.id,{
          include:[{
              model: models.Produit, as: 'produits',
              attributes: ['nom', 'description']
          }]
      }).then(function(categorie){
          return res.json(categorie)
      })
    }

}