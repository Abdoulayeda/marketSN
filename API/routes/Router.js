/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 14/04/2022 - 04:02:42
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
const express = require('express')
const User = require('../controllers/Users')
const Produit = require('../controllers/Produit')
const Categorie = require('../controllers/Categorie')
const verifyToken  = require("../middleware/VerifyToken");
const refreshToken = require("../controllers/RefreshToken");
const { route } = require('../app');

const router = express.Router();

router.get('/users', verifyToken, User.getUsers);
router.post('/register', User.Register);
router.post('/login', User.Login);
router.get('/token', refreshToken);
router.get('/all', User.getUsers);
router.get('/delete/:id', User.delete)

router.post('/logout',User.Logout)
router.get('/profile', User.getUserProfile);
//Route pour la categorie
router.get('/categorie/:id', Categorie.categorie)
router.post('/createcategorie',Categorie.createCategorie);

//Route pour produit
router.post('/produitcreate', Produit.createproduit);
router.get('/produits',Produit.getallproduits)

module.exports= router;