/**
    * @description      : 
    * @author           : aliou
    * @group            : 
    * @created          : 16/04/2022 - 02:59:19
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 16/04/2022
    * - Author          : aliou
    * - Modification    : 
**/
const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err) return res.sendStatus(403);
    req.email = decoded.email;
    next();
    })
}

module.exports = verifyToken