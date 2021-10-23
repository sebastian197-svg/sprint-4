const paisesServicios = require('../servicios/paises.servicios.js');

module.exports = (app) => {

    app.get("/paises/", async (req, res) => {
        try {

            const consultaPais = await paisesServicios.mostrarPaises(req.body);
            if (consultaPais.length > 0) { res.status(200).json(consultaPais); }

            else { res.status(404).json("El Pais no existe"); }

        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/paisesFiltro/", async (req, res) => {

        try {

            const consultaPais = await paisesServicios.mostrarPaises(req.body);

            if (consultaPais.length > 0) { res.status(200).json(consultaPais); }

            else {
                res.status(404).json({
                    error: `No Hay datos para mostar`
                });
            }



        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/paises/", async (req, res) => {
        const region = await paisesServicios.region(req.body);
        const crearPais = await paisesServicios.crearPais(req.body, region);
        const crearCiudad = await paisesServicios.crearCiudad(req.body, crearPais);

        if (crearPais.length > 0 && region > 0 &&  crearCiudad > 0) {
            res.status(201).json({
                mensaje: `Pais creado correctamente ! `
            });
        }

        else { res.status(400).json({ mensaje: "Error al Crear Pais" }); }

    });

    app.get("/paisesr/", async (req, res) => {
        try {
            const consultaRegion = await paisesServicios.region(req.body);
            if (consultaRegion.length > 0) { res.status(200).json(consultaRegion); }
    
            else { res.status(404).json("La region no existe"); }
    
        } catch (error) { res.status(500).json({ Error: error.message }); }
    
    });

    app.post("/paisesp/", async (req, res) => {
        try {
            const consultaPais = await paisesServicios.pais(req.body);
            if (consultaPais.length > 0) { res.status(200).json(consultaPais); }
    
            else { res.status(404).json("El pais no existe"); }
    
        } catch (error) { res.status(500).json({ Error: error.message }); }
    
    });

    app.post("/paisesc/", async (req, res) => {
        try {
            const consultaCiudad = await paisesServicios.ciudad(req.body);
            if (consultaCiudad.length > 0) { res.status(200).json(consultaCiudad); }
    
            else { res.status(404).json("La Ciudad no existe"); }
    
        } catch (error) { res.status(500).json({ Error: error.message }); }
    
    });

}

