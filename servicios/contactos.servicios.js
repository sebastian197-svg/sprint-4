const { sequelize } = require("../configuracion/configuracion.js");

module.exports.mostrarContactos = async (objContacto) => {

    let { id, email, nombre, apellido, pais, region, compania } = objContacto;

    query = "SELECT c.id, c.nombre as nombre, c.apellido, c.email, telefono, r.nombre as region,"
    +" p.nombre  as pais,  ci.nombre as ciudad, "
    +" com.nombre as compania, c.cargo, c.canal_preferido FROM contactos c "
    +" inner join regiones r on c.idregion = r.idregion "
    +" inner join paises p on p.idpais = c.idpais "
    +" inner join ciudades ci on ci.idciudad = c.idciudad "
    +" inner join companias com on c.idcompania = com.idcompania "
    +" WHERE 1 = 1 "
    if (id) { query += " AND c.id = :id"; }
    if (email) { query += " AND c.email = :email"; }
    if (nombre) { query += " AND c.nombre LIKE :nombre"; }
    if (apellido) { query += " AND c.apellido LIKE :apellido"; }
    if (pais) { query += " AND p.nombre LIKE :pais"; }
    if (region) { query += " AND r.nombre LIKE :region"; }
    if (compania) { query += " AND com.nombre LIKE :compania"; }

    const respuesta =
        sequelize.query(query, {
            replacements: { id: id, email: email, nombre: `%${nombre}%`, apellido: `%${apellido}%`, pais: `%${pais}%`, region: `%${region}%`, compania: `%${compania}%` },
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

module.exports.buscarContacto = async (objContacto) => {

    if (objContacto.id) {
        query = "SELECT * FROM contactos WHERE id = :id";

        const respuesta =
            sequelize.query(query, {
                replacements: { id: objContacto.id },
                type: sequelize.QueryTypes.SELECT
            });

        return respuesta;

    } else if (objContacto.email) {

        query = "SELECT * FROM contactos WHERE email = :email";

        const respuesta =
            sequelize.query(query, {
                replacements: { email: objContacto.email },
                type: sequelize.QueryTypes.SELECT
            });

        return respuesta;


    } else {

        return "Error, Debe enviar Email";

    }

}

module.exports.crearContacto = async (objContacto) => {
    const { nombre, apellido, email, telefono, region, pais, ciudad, compania, cargo, canal_preferido } = objContacto;



        query = "INSERT INTO contactos (nombre, apellido, email, telefono, idregion, idpais, idciudad, idcompania, cargo, canal_preferido) VALUES ( :nombre, :apellido, :email, :telefono, :region, :pais, :ciudad, :compania, :cargo, :canal_preferido ) ";

        const respuesta2 =
            sequelize.query(query, {
                replacements: { nombre, apellido, email, telefono, region, pais, ciudad, compania, cargo, canal_preferido },
                type: sequelize.QueryTypes.INSERT
            });

        return respuesta2;

}

module.exports.editarContacto = async (objContacto) => {

    const { id, nombre, apellido, email, telefono, region, pais, ciudad, compania, cargo, canal_preferido } = objContacto;

    if (id) {
        query = "UPDATE contactos SET nombre = :nombre , apellido = :apellido, email  =:email, telefono = :telefono, idregion = :region, idpais = :pais, idciudad = :ciudad, idcompania = :compania, cargo = :cargo, canal_preferido = :canal_preferido WHERE id = :id";

        const respuesta2 =
            sequelize.query(query, {
                replacements: { id, nombre, apellido, email, telefono, region, pais, ciudad, compania, cargo, canal_preferido },
                type: sequelize.QueryTypes.UPDATE
            });

        return respuesta2;

    }

}


module.exports.eliminarContacto = async (objContacto) => {

    const id = objContacto.id;

    if (id) {

        query = "DELETE FROM contactos WHERE id = :id";

        const respuesta =
            sequelize.query(query, {
                replacements: { id },
                type: sequelize.QueryTypes.DELETE
            });

        return respuesta;

    }

}