const usuariosServicios = require('../servicios/usuarios.servicios.js');
const { jwt, firma } = require("../configuracion/configuracion.js");

function validarDatos(req, res, next) {

    let {  nombre, apellido, email, password, usuario } = req.body;
    if (!usuario || !nombre || !apellido || !email || !password) {

        res.status(400).json({
            error: `Datos Incompletos !`
        });

    } else {

        next();

    }

}


async function validarExistencia(req, res, next) {

    const usuariosServicios = require('../servicios/usuarios.servicios.js');

    const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);

    if (consultaUsuario.length > 0) { res.status(409).json({ error:`El usuario ${req.body.usuario} ya existe en la base de datos`}); }

    else { next(); }

}


function esAdmin(req, res, next) {

    const { jwt, firma } = require("../configuracion/configuracion.js");

    const token = req.headers.authorization.split(' ')[1];

    if (!token) {

        res.status(401).json({ error: "Acceso Restringido" });

    } else {

        const verificar = jwt.verify(token, firma)

        if (verificar.admin == 1) { next(); }
        else { res.status(401).json({ error: "Acceso Restringido" }); }

    }

}

module.exports = { validarDatos, validarExistencia, esAdmin };