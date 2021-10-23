const contactosServicios = require('../servicios/contactos.servicios.js');
const { validarDatos, validarExistencia, validarId } = require('../middlewares/contactos.middleware.js');

module.exports = (app) => {

    app.get("/contactos/", async (req, res) => {
        try {

            const consultaContactos = await contactosServicios.mostrarContactos(req.body);
            
            if (consultaContactos.length > 0) { res.status(200).json(consultaContactos); }

            else {
                res.status(404).json({
                    error: `No Hay datos para mostar`
                });
            }

        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/contactosFiltro/", async (req, res) => {

        try {

            const consultaContactos = await contactosServicios.mostrarContactos(req.body);
            if (consultaContactos.length > 0) { res.status(200).json(consultaContactos); }

            else {
                res.status(404).json({
                    error: `No Hay datos para mostar`
                });
            }



        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/contactos/", validarDatos, validarExistencia, async (req, res) => {

        const crearContacto = await contactosServicios.crearContacto(req.body);

        if (crearContacto.length > 0) {
            res.status(201).json({
                mensaje: `Nueva Contacto con nombre : " ${req.body.nombre} " creada correctamente ! `
            });
        }

        else { res.status(400).json({ mensaje: "Error al Crear Contacto" }); }

    });

    app.put("/contactos/", validarId, async (req, res) => {

        if (req.body.id) {

            const consultaContacto = await contactosServicios.buscarContacto(req.body);

            if (consultaContacto.length > 0) {

                const editarContacto = await contactosServicios.editarContacto(req.body);

                if (editarContacto.length > 0) {
                    res.status(201).json({
                        mensaje: `El Contacto con nombre : " ${req.body.nombre} " fue editada correctamente ! `
                    });
                }

            }

            else { res.status(400).json({ mensaje: "Error al Editar el Contacto" }); }

        } else { res.status(400).json({ mensaje: "Debe Enviar el Id de el Contacto a Editar" }); }

    });

    app.delete("/contactos/", async (req, res) => {

        if (req.body.id) {

            const consultaContacto = await contactosServicios.buscarContacto(req.body);

            if (consultaContacto.length > 0) {

                const eliminarContacto = await contactosServicios.eliminarContacto(req.body);

                res.status(201).json({
                    mensaje: `El Contacto con nombre "${consultaContacto[0].nombre}" fue eliminado correctamente ! `
                });

            }

            else { res.status(400).json({ mensaje: "Error al Eliminar Contacto" }); }

        } else { res.status(400).json({ mensaje: "Debe Enviar el Id del Contacto a Eliminar" }); }

    });


}