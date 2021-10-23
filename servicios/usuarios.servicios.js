const { sequelize, firma } = require("../configuracion/configuracion.js");

module.exports.mostrarUsuarios = async (objUsuario) => {
    let { id, email, nombre, apellido, usuario } = objUsuario;

    query = "SELECT * FROM usuarios WHERE 1 = 1"
    if (id) { query += " AND id = :id"; }
    if (email) { query += " AND email = :email"; }
    if (nombre) { query += " AND nombre LIKE :nombre"; }
    if (apellido) { query += " AND apellido LIKE :apellido"; }
    if (usuario) { query += " AND usuario LIKE :usuario"; }
    const respuesta =
        sequelize.query(query, {
            replacements: { id: id, email: email, nombre: `%${nombre}%`, apellido: `%${apellido}%`, usuario: `%${usuario}%` },
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

module.exports.buscarUsuario = async (objUsuario) => {

    if (objUsuario.usuario) {
        query = "SELECT * FROM usuarios WHERE usuario = :usuario";
    } else {
        query = "SELECT * FROM usuarios";
    }

    const respuesta =
        sequelize.query(query, {
            replacements: { usuario: objUsuario.usuario },
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

module.exports.crearUsuario = async (objUsuario) => {

    const { usuario, nombre, apellido, email, password, telefono, direccion, admin } = objUsuario;
    if (usuario) {

        query = "INSERT INTO usuarios ( nombre, apellido, email, password, telefono, direccion, admin, usuario) VALUES ( :nombre, :apellido, :email, :password, :telefono, :direccion, :admin, :usuario ) ";

        const respuesta =
            sequelize.query(query, {
                replacements: { nombre, apellido, email, password, telefono, direccion, admin, usuario },
                type: sequelize.QueryTypes.INSERT
            });

        return respuesta;

    }

}


module.exports.editarUsuario = async (objUsuario) => {

    const { usuario, nombre, apellido, email, password, telefono, direccion } = objUsuario;

    if (usuario) {

        query = "UPDATE usuarios SET nombre = :nombre , apellido = :apellido, email = :email ,password = :password, telefono = :telefono, direccion = :direccion WHERE usuario = :usuario";

        const respuesta =
            sequelize.query(query, {
                replacements: { usuario, nombre, apellido, email, password, telefono, direccion },
                type: sequelize.QueryTypes.UPDATE
            });

        return respuesta;

    }

}


module.exports.eliminarUsuario = async (objUsuario) => {

    const id = objUsuario.id;

    if (id) {

        query = "DELETE FROM usuarios WHERE id = :id";

        const respuesta =
            sequelize.query(query, {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE
            });

        return respuesta;

    }

}