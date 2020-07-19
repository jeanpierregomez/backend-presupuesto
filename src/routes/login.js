const {Router} = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = Router();
const Usuario= require('../models/Usuario');

router.post('/', (req, res) => {
    let body = req.body.params;
    console.log(body);
    Usuario.findOne({email : body.email}, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok : false,
                err
            });
        }

        if(!usuarioDB) {
            return res.status(400).json({
                ok : false,
                 error : {
                     msg : "(Usuario) o contraseña incorrectos"
                 }
            });
        }

        if (!bcrypt.compareSync(body.contrasenia, usuarioDB.contraseña)) {
            return res.status(499).json({
                ok : false,
                 error : {
                     msg : "Usuario o (contraseña) incorrectos"
                 }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, {expiresIn : process.env.CADUCIDAD_TOKEN});

        res.json({
            ok:  true,
            usuario : usuarioDB,
            token
        });
    });
});

module.exports = router;