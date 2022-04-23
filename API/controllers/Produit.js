/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 20/04/2022 - 01:39:09
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 20/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
const models = require('../models')
const fileUpload = require('express-fileupload')
module.exports = {
     getallproduits: async (req, res)=>{
      try{
      const produits=  await models.Produit.findAll()
      res.json(produits)
      }catch(err) {
        
      }
      
    }, 

    createproduit: async (req, res)=>{
        const { nom,description, prix,quantite , CategorieId, UserId } = req.body
        let file = req.files.image
        let image_name =file.name
        file.mv('public/images/'+image_name)
        try{
                await models.Produit.create({
                 nom: nom,
                 description: description,
                 image: image_name,
                 prix: prix,
                 quantite: quantite,
                 CategorieId: CategorieId,
                 UserId: UserId,
                 createdAt: new Date(),
                 updatedAt: new Date(),
                })
                res.redirect('/api/vendeur')
            }catch(err){
              console.error(err)
            }
    },
}