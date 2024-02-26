const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const userToken = req.header('token')

    if (!userToken) {
        return res.status(401).json({
            auth: false,
            msg: 'não existe token de autenticação'
        })
    }

    jwt.verify(userToken, process.env.SECRET, function (err, decoded) {
        if (err) return res.status(500).json({
            auth: false,
            msg: 'Token invalido'
        })

        req.user = decoded.user
        next()
    })

 
}