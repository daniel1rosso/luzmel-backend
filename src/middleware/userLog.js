const LoginModel = require('../models/LoginModel')
const UsuarioModel = require('../models/UsuarioModel')

module.exports = async (req, res, next) => {
    try {
        //-- Token Session --//
        const token_session = req.headers.authorization.split(" ")[1];
        //-- User belonging to the token --//
        const user_login = await LoginModel.find({ token: token_session });
        //-- Res --//
        const decoded = (user_login.length !== 0) ? true : false
        res.userlog = user_login[0].user;
        (decoded) ? next() : res.status(401).json({ message: "Auth failed",  userlog: false })
    } catch (error) {
        res.status(501).json({ message: "UserLog failed",  userlog: false })
    }
}