const usuariosServicios = require('../servicios/usuarios.servicios.js');
const { jwt, firma } = require("../configuracion/configuracion.js");
const { validarDatos, validarExistencia, esAdmin } = require('../middlewares/usuarios.middleware.js');

module.exports = (app) => {

    app.get("/usuarios/", async (req, res) => {
        try {

            const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);
            const usuario = consultaUsuario.map(({ id, usuario, nombre, apellido }) => { return { id, usuario, nombre, apellido } });

            if (consultaUsuario.length > 0) { res.status(200).json(usuario); }

            else { res.status(404).json("El usuario no existe"); }

        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/usuariosFiltro/", async (req, res) => {

        try {

            const consultaUsuarios = await usuariosServicios.mostrarUsuarios(req.body);

            if (consultaUsuarios.length > 0) { res.status(200).json(consultaUsuarios); }

            else {
                res.status(404).json({
                    error: `No Hay datos para mostar`
                });
            }



        } catch (error) { res.status(500).json({ Error: error.message }); }

    });

    app.post("/usuarios/", esAdmin, validarDatos, validarExistencia, async (req, res) => {
        const crearUsuario = await usuariosServicios.crearUsuario(req.body);

        if (crearUsuario.length > 0) {
            res.status(201).json({
                mensaje: `Usuario ${req.body.usuario} creado correctamente ! `
            });
        }

        else { res.status(400).json({ mensaje: "Error al Crear Usuario" }); }

    });

    app.put("/usuarios/", esAdmin, async (req, res) => {
        const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);
        if (consultaUsuario.length > 0) {

            const editarUsuario = await usuariosServicios.editarUsuario(req.body);

            if (editarUsuario.length > 0) {
                res.status(201).json({
                    mensaje: `Usuario ${req.body.usuario} editado correctamente ! `
                });
            }

        }

        else { res.status(400).json({ mensaje: "Error al Editar Usuario" }); }

    });

    app.delete("/usuarios/", esAdmin, async (req, res) => {
        const consultaUsuario = await usuariosServicios.buscarUsuario(req.body);

        if (consultaUsuario.length > 0) {

            const eliminarUsuario = await usuariosServicios.eliminarUsuario(req.body);

            res.status(201).json({
                mensaje: `Usuario ${req.body.usuario} eliminado correctamente ! `
            });

        }

        else { res.status(400).json({ mensaje: "Error al Eliminar Usuario" }); }

    });

    app.post("/ingreso/", async (req, res) => {

        const { usuario, password } = req.body;

        if (!usuario || !password) {

            res.status(404).json({
                error: `Datos Incompletos !`
            });

        } else {

            const usuBus = await usuariosServicios.buscarUsuario(req.body);

            if (usuBus.length > 0 && usuario == usuBus[0].usuario && password == usuBus[0].password) {
                if (usuBus[0].admin == 1) {
                    usuBus[0].admin = true;
                } else {
                    usuBus[0].admin = false;
                }
                const informacion = { usuario: usuario, admin: usuBus[0].admin, id: usuBus[0].id };
                const algoritmo = { algorithm: "HS512", expiresIn: 120000 }
                const token = jwt.sign(informacion, firma, algoritmo);
                res.status(200).json({
                    mensaje: 'Autenticación correcta',
                    token: token,
                    admin: usuBus[0].admin
                });

            } else {
                res.status(401).json({ error: "Usuario o Contrasena incorrecta" });
            }

        }

    });

}