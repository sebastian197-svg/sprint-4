const companiasServicios = require('../servicios/companias.servicios.js');
const { jwt, firma } = require("../configuracion/configuracion.js");
const { validarDatos, validarExistencia, esAdmin } = require('../middlewares/usuarios.middleware.js');

module.exports = (app) => {

    app.get("/companias/", async (req, res) => {
        
        try {

            const companias = await companiasServicios.companias(req.body);

            if (companias.length > 0) { res.status(200).json(companias); }

            else {
                res.status(404).json({
                    error: `No Hay datos para mostar`
                });
            }



        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/crearCompania/", async (req, res) => {

        const crearCompania = await companiasServicios.crearCompania(req.body);

        if (crearCompania.length > 0 ) {
            res.status(201).json({
                mensaje: `Compañia creada correctamente ! `
            });
        }

        else { res.status(400).json({ mensaje: "Error al Crear La Compañia" }); }

    });

}