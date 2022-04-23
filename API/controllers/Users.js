/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 14/04/2022 - 04:18:53
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Auth = require('../config/Authorization')

module.exports = {
getUsers : async(req, res) => {
    try {
        const users = await models.User.findAll();
        res.json(users);
    } catch (error) {
        console.log(error);
    }
},

getUserProfile: (req,res) => {
    const token = req.cookies.refreshToken;    //const token=token.split(' ')[1];
    if (token) {
        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        const userId = decodedToken.userId
        const email = decodedToken.email
        const role = decodedToken.role
        console.log(userId, email,role)
    }else{
        console.log("Pas de token")
    }
  },

Register :async(req, res) => {
    const {email, password, confPassword, telephone } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Confirmez votre mot de passe"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await models.User.create({
            email: email,
            password: hashPassword,
            telephone: telephone
        });
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
},

Login : async(req, res) => {
    try {
        const user = await models.User.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"});
        const userId = user[0].id;
        const email = user[0].email;
        const role = user[0].role;
        const accessToken = jwt.sign({userId, email,role}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({userId, email,role}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await models.User.update({refresh_token: refreshToken},{
            where:{
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
       // res.json({ accessToken });
         if(user[0].role=='admin'){
           return res.redirect('/api/admin')
        }
        if(user[0].role=='vendeur'){
            return res.redirect('/api/vendeur')
        }
        if(user[0].role!='vendeur' || user[0].role!='admin'){
          return  res.redirect('/api/info');
        } 
    } catch (error) {
        res.status(404).json({msg:"Cette utilisateur n'existe pas"});
    }
},

Logout :async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await models.User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await models.User.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.redirect('/');
},

delete: async (req, res) => {
    const id = req.params.id
    await models.User.destroy({
        where:{id:id}
    })
    return res.redirect('/api/admin')
}

}