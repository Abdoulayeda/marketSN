/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 19/04/2022 - 01:40:39
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
const express = require("express");
const bodyParser = require('body-parser');
const models = require("./models")
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv= require("dotenv");
const fileUpload = require('express-fileupload')
const cookieParser= require("cookie-parser");
const cors=require("cors");
const router = require("./routes/Router");
const app = express();

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(express.json())
app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

dotenv.config();

//Page d'acceuil
app.get('/', (req, res) => {
    return res.redirect('/api/login')
})

//Page de login
app.get('/api/login',(req, res)=>{
    return res.render('login')
})  

app.get('/api/info',(req,res)=>{
   const token = req.cookies.refreshToken
   if (token){
       const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
       if (decodedToken.role === 'Client') return res.render('admin/info')
   } else {
       return res.redirect('/')
    }
})

//Page de l'administrateur
app.get('/api/admin', (req, res)=>{
    const token = req.cookies.refreshToken; 
    if (token){
        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        if (decodedToken.role=="admin"){
           models.User.findAll({where: {role:"vendeur"}})
            .then(function(users){
                return res.render('admin/index',{'decodedToken': decodedToken, 'users':users})
            })
        } else{
            return res.redirect('/')
        }
    }else{
        return res.send('Pas de')
    }
})

app.get('/api/createvendeur', (req, res)=>{
  return res.render('vendeur/createvendeur')
})

app.get('/vendeur/:id',(req, res)=>{
  const id = req.params.id
  models.User.findByPk(id,{
    include:[{
      model: models.Produit, as: 'produits',
      attributes:['nom', 'description', 'prix','image', 'quantite','actif']  
    }]
})
  .then(vendeur=>{
      return res.render('admin/vendeur',{'vendeur':vendeur})
  })
})

//Page d'acceuil du vendeur
app.get('/api/vendeur', (req, res)=>{
    const token = req.cookies.refreshToken; 
    if (token){
        var decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        models.User.findByPk(decodedToken.userId,{
            include:[{
              model: models.Produit, as: 'produits',
              attributes:['nom', 'description', 'prix','image', 'quantite','actif']  
            }]
        })
        .then(user =>{
           // const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
            if (decodedToken.role=="vendeur"){      
                return res.render('vendeur/index',{'decodedToken': decodedToken,'user':user}) 
            } else{
                return res.redirect('/')
            }
        })
       
    }else{
        return res.send('Pas de')
    }
})

//Fonction pour creer un produit
app.get('/api/produitcreate',(req,res)=>{
    models.Categorie.findAll()
      .then(function(categories){
        const token = req.cookies.refreshToken;
        if(!token){
            return res.redirect('/')
        } 
        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
          return res.render('produit/create', {'categories':categories, decodedToken})
      })
  })

  app.get('/api/createcategorie', (req, res) => {
      return res.render('categorie/create')
  })


//Importation des routes
app.use("/api",router);

app.listen(5000, ()=> console.log('l\'aplication est lancé: http://localhost:5000'));


module.exports= app
