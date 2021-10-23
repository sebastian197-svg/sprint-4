const usuariosServicios = require('../servicios/usuarios.servicios.js');
const { jwt, firma } = require("../configuracion/configuracion.js");


function validarDatos(req, res, next) {
    const { nombre, apellido, email} = req.body;

    if ( !nombre || !apellido || !email ) {

        res.status(400).json({
            error: `Datos Incompletos ! al menos debe enviar Nombre, Apellido , Email`
        });

    } else {

        next();

    }

}

function validarId(req, res, next) {       
    const { id} = req.body;

    if ( !id ) {

        res.status(400).json({
            error: `Datos Incompletos ! debe Enviar ID`
        });

    } else {

        next();

    }

}


async function validarExistencia(req, res, next) {

    const contactosServicios = require('../servicios/contactos.servicios.js');

    const consultaContacto = await contactosServicios.buscarContacto(req.body);

    if (consultaContacto.length > 0) { res.status(409).json({
        error: `El contacto con Email ${req.body.email} ya existe en la base de datos`
    }); }

    else { next(); }

}

module.exports = { validarDatos, validarExistencia, validarId};