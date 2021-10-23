const { sequelize, firma } = require("../configuracion/configuracion.js");

module.exports.companias = async (objPais) => {

    query = "select * from companias";
    const respuesta =
        sequelize.query(query, {
            replacements: {  },
            type: sequelize.QueryTypes.SELECT
        });

    return respuesta;

}

module.exports.crearCompania = async (objPais) => {
    let { nombre } = objPais;
        query = "INSERT INTO companias (nombre) VALUES (:nombre) ";
    
    

    const respuesta =
        sequelize.query(query, {
            replacements: { nombre},
            type: sequelize.QueryTypes.INSERT
        });



    return respuesta;
}