const {Router} = require('express');
const bcrypt = require('bcrypt');
const router = Router();
const Usuario = require('../models/Usuario');
const {verificarToken} = require('../middelwares/autenticacion');

router.post('/', (req, res) => {
    let body = req.body.params;
    let usuario = new Usuario({
        nombre : body.nombre,
        email : body.email,
        contraseña : bcrypt.hashSync(body.contrasenia, 10),
        img : body.img
    });
    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok : false,
                err
            });
        }
        res.json({
            ok : true,
            usuario : usuarioDB
        });
    });
});

router.put('/:id', verificarToken, (req, res) => {
    let id = req.params.id;
    let body =  req.body.params;
    if (req.usuario._id !== id) {
        return res.status(401).json({
            ok : false,
            msg : "Usuario no autenticado para realizar esta operación"
        });
    }
    Usuario.findByIdAndUpdate(id, body, {new : true}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok : false,
                err
            });
        }
        res.json({
            ok : true,
            usuario : usuarioDB
        });
    });
});

router.get('/', verificarToken, (req, res) => {
    console.log("<<< user ", req.usuario._id);
    Usuario.findById(req.usuario._id, (err, usuarioDB) => {
        if (err || !usuarioDB) {
            console.log("No existe");
            return res.status(400).json({
                ok : false,
                err
            });
        } 
        console.log(">>> db", usuarioDB);
        res.json({
            ok : true,
            usuario : usuarioDB
        });
    });
    
});

module.exports = router;