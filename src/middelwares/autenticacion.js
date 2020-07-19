const jwt = require('jsonwebtoken');

let verificarToken = (req, res, next) => {

    let token = req.get('token');
    console.log("<<< verificando token");

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            console.log("<<< Error token")
            return res.status(401).json({
                ok : false,
                err
            });
        } 

        req.usuario = decoded.usuario;
        next();

    });
};

module.exports = {
    verificarToken
};