const { sequelize, firma } = require("../configuracion/configuracion.js");

module.exports.mostrarPaises = async (objPais) => {

    let { nombre } = objPais;

    query = "select r.nombre as region, p.nombre as pais, c.nombre as ciudad "
            +" from regiones r "
            +" inner join paises p on r.idregion = p.idregion "
            +" inner join ciudades c on p.idpais = c.idpais WHERE 1 = 1 "
    if (nombre) { query += " AND r.nombre LIKE :nombre"; }
    query+="order by region"; 
    const respuesta =
        sequelize.query(query, {
            replacements: { nombre: `%${nombre}%` },
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}


module.exports.region = async (objPais) => {
    let { region } = objPais;
    query = "SELECT idregion, nombre FROM regiones where 1=1 "
    if(region) { query+=" AND nombre LIKE :region";}

    const respuesta =
        sequelize.query(query, {
            replacements: { region },
            type: sequelize.QueryTypes.SELECT
        });



    return respuesta;
}

module.exports.pais = async (objPais) => {
    let { id } = objPais;
    query = "SELECT idpais, nombre FROM paises where 1=1 "
    if(id) { query+=" AND idregion = :id";}

    const respuesta =
        sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });



    return respuesta;
}

module.exports.ciudad = async (objPais) => {
    let { id } = objPais
    query = "SELECT idciudad, nombre FROM ciudades where 1=1 "
    if(id) { query+=" AND idpais = :id";}

    const respuesta =
        sequelize.query(query, {
            replacements: { id },
            type: sequelize.QueryTypes.SELECT
        });



    return respuesta;
}

module.exports.crearPais = async (objPais, region) => {
    let { pais } = objPais;
    let id;
    region.forEach(element => {
        id  = element.idregion;
        query = "INSERT INTO paises (nombre, idregion) VALUES (:pais, :id) ";
    });
    

    const respuesta =
        sequelize.query(query, {
            replacements: { pais, id },
            type: sequelize.QueryTypes.INSERT
        });



    return respuesta;
}

module.exports.crearCiudad = async (objPais, pais) => {
    let { ciudad } = objPais;
    let id = pais[0];
    query = "INSERT INTO ciudades (nombre, idpais) VALUES (:ciudad, :id) ";
   
   

    const respuesta =
        sequelize.query(query, {
            replacements: { ciudad, id },
            type: sequelize.QueryTypes.INSERT
        });



    return respuesta;
}