/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 14/04/2022 - 20:36:08
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 14/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
const models = require("../models");
const jwt = require("jsonwebtoken");

const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const user = await models.User.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
        if(!user[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id; 
            const email = user[0].email;
            const accessToken = jwt.sign({userId, email}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            res.json({ accessToken});
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = refreshToken