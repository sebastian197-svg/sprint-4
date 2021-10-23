const getHtmlUsuarios = (usuarios) => {

    let html = "";

    if (usuarios.error) {

        Swal.fire("Atencion", usuarios.error, "error");

    }

    if (usuarios.length > 0) {

        html = `<table class="table table-bordered table-hover dt-responsive tablas">
    <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Apellido</th>
        <th scope="col">Usuario</th>
        <th scope="col">Email</th>`
        if (localStorage.getItem("Admin") == 'true') {
            html += `<th scope="col">Acciones</th>`
        }
        html += `</tr>
    </thead>
    <tbody>
  `;

        usuarios.forEach(usuario => {
            html += `<tr>
         <td>${usuario.nombre}</td>
         <td>${usuario.apellido}</td>
         <td>${usuario.usuario}</td>
         <td>${usuario.email}</td>`
            if (localStorage.getItem("Admin") == 'true') {
                html += `
         <td>
         <button type="button" class="btn btn-outline-warning btn-sm " idUsuario="${usuario.id}" onClick="vistaEditarUsuario(event)">Editar</button>
         <button type="button" class="btn btn-outline-danger btn-sm btnEliminarUsuario" nombreUsuario="${usuario.nombre + " " + usuario.apellido}" idUsuario="${usuario.id}" onClick="eliminarUsuario(event)" >Eliminar</button>
         </td>`}
            html += `</tr>`

        });

        html += `  
   
     </tbody>
   </table>`;

    }

    return html;

}


btnUsuarios.addEventListener('click', async (e) => {
    e.preventDefault();
    $(".inicio").hide();
    const divBusqueda = document.createElement("div");
    divBusqueda.classList.add("divBusqueda");
    let html = '';
    if (localStorage.getItem("Admin") == 'true') {
        html += `
        <div class="d-flex justify-content-center"><button type="button" class="btn btn-success" id="crearUsuario" data-toggle="modal" data-target="#nuevoUsuario">Crear Usuario</button></div>
        `
    }
    html += `
    <form>
        <div class="input-group busquedaUsuario d-flex justify-content-around">
            <input type="text" class="form-control col-4" id="nombreBusquedaUsuario" placeholder="Nombre" >
            <input type="text" class="form-control col-4" id="apellidoBusquedaUsuario" placeholder="Apellido">
            <input type="text" class="form-control col-4" id="emailBusquedaUsuario" placeholder="Email">
            <input type="text" class="form-control col-4" id="usuarioBusquedaUsuario" placeholder="Usuario">
            <button type="submit" class="btn btn-primary" id="buscarContacto" onClick="buscarUsuario(event)" >Buscar</button>
            <button type="reset" class="btn btn-danger" id="borrar" >Limpiar</button>
        </div>
    </form> `

    divBusqueda.innerHTML = html;

    contenidoMostrar.innerHTML = '<div class="alert alert-success" role="alert">Listado de Usuarios</div>';
    contenidoMostrar.appendChild(divBusqueda);

    const divTabla = document.createElement("div");
    divTabla.classList.add("divTabla")
    contenidoMostrar.appendChild(divTabla);

});

async function buscarUsuario(e) {
    const divTabla = document.querySelector(".divTabla");

    e.preventDefault();

    try {

        divTabla.innerHTML = "";
        const nombre = document.querySelector('#nombreBusquedaUsuario').value;
        const apellido = document.querySelector('#apellidoBusquedaUsuario').value;
        const email = document.querySelector('#emailBusquedaUsuario').value;
        const usuario = document.querySelector('#usuarioBusquedaUsuario').value;

        const ext = '/usuariosFiltro/';
        const cuerpo = {
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "usuario": usuario
        };

        const metodo = 'POST';

        let usuarios = await fetcheo(url, ext, cuerpo, metodo);

        if (usuarios.error) { Swal.fire("Atencion", usuarios.error, "error"); }
        if (usuarios) {

            const tabla = getHtmlUsuarios(usuarios);
            divTabla.innerHTML = tabla;


        } else if (usuarios.error) { Swal.fire("Atencion", usuarios.error, "error"); }
        else { Swal.fire("Atencion", usuarios.error, "error"); }

    } catch (err) {
        Swal.fire("Atencion", error, "error");
    }


};

btnCrearUsuario.addEventListener('click', async (e) => {

    e.preventDefault();

    const nombre = document.querySelector('.nuevoNombreUsuario').value;
    const apellido = document.querySelector('.nuevoApellidoUsuario').value;
    const usuario = document.querySelector('.nuevoUsuarioCrear').value;
    const password = document.querySelector('.nuevaContrasenaUsuario').value;
    const telefono = document.querySelector('.nuevoTelefonoUsuario').value;
    const direccion = document.querySelector('.nuevoDomicilioUsuario').value;
    const email = document.querySelector('.nuevoEmailUsuario').value;
    const admin = document.getElementById('nuevoRol').value;

    try {

        const ext = '/usuarios/';
        const cuerpo = {
            "admin": admin,
            "nombre": nombre,
            "apellido": apellido,
            "usuario": usuario,
            "password": password,
            "email": email, 
            "telefono": telefono, 
            "direccion": direccion

        };
        const metodo = 'POST';

        let crearUsuario = await fetcheo(url, ext, cuerpo, metodo);

        if (crearUsuario.mensaje) {

            $('#nuevoUsuario').modal('hide');

            $('#nuevoUsuario').on('hidden.bs.modal', function (e) {
                $(this)
                    .find("input,select")
                    .val('')
                    .end();
            })

            Swal.fire("Creado!", "Usuario Creado Correctamente.", "success");
            document.querySelector(".divTabla").innerHTML = "";

        } else if (crearUsuario.error) { Swal.fire("Atencion", crearUsuario.error, "error"); }

    } catch (err) {
        Swal.fire("Atencion", error, "error");
    }


});


async function vistaEditarUsuario(e) {

    e.preventDefault();

    const id = await e.target.attributes.idUsuario.value;

    $('#editarUsuario').modal('show');
    $('#editarUsuario').on('hidden.bs.modal', function (e) {
        $(this)
            .find("input,select")
            .val('')
            .end();
    })

    try {

        const ext = '/usuariosFiltro/';
        const cuerpo = {
            "id": id
        };

        const metodo = 'POST';

        const traerUsuario = await fetcheo(url, ext, cuerpo, metodo);
        if (traerUsuario) {

            document.querySelector('.editarIdUsuario').value = traerUsuario[0].id;
            document.querySelector('.editarNombreUsuario').value = traerUsuario[0].nombre;
            document.querySelector('.editarApellidoUsuario').value = traerUsuario[0].apellido;
            document.querySelector('.editarUsuarioModificar').value = traerUsuario[0].usuario;
            document.querySelector('.editarEmailUsuario').value = traerUsuario[0].email;
            document.querySelector('.editarTelefonoUsuario').value = traerUsuario[0].telefono;
            document.querySelector('.editarDomicilioUsuario').value = traerUsuario[0].direccion;
            document.querySelector('.editarContrasenaUsuario').value = traerUsuario[0].password;

        } else if (traerUsuario.error) { Swal.fire("Atencion", traerUsuario.error, "error"); }

    } catch (err) {
        Swal.fire("Atencion", error, "error");
    }

};

async function eliminarUsuario(e) {

    e.preventDefault();

    const idUsuario = await e.target.attributes.idUsuario.value;
    const nombreUsuario = await e.target.attributes.nombreUsuario.value;

    Swal.fire({
        title: `¿Está segur@ de borrar a ${nombreUsuario}?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Borrar`,
        denyButtonText: `NOOO !`,
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {

                const ext = '/usuarios/';
                const cuerpo = {
                    "id": idUsuario
                };

                const metodo = 'DELETE';

                const eliminarUsuario = await fetcheo(url, ext, cuerpo, metodo);

                if (eliminarUsuario.mensaje) {

                    Swal.fire("Eliminado!", "Usuario Eliminado Correctamente.", "success");
                    document.querySelector(".divTabla").innerHTML = "";


                } else if (eliminarUsuario.error) { Swal.fire("Atencion", eliminarUsuario.error, "error"); }

            } catch (err) {
                Swal.fire("Atencion", error, "error");
            }

        } else if (result.isDenied) {
            Swal.fire("Cancelado!", "Operacion Cancelada", "info");
        }
    })

};

btnEditarUsuario.addEventListener('click', async (e) => {

    e.preventDefault();

    const id = document.querySelector('.editarIdUsuario').value;
    const nombre = document.querySelector('.editarNombreUsuario').value;
    const apellido = document.querySelector('.editarApellidoUsuario').value;
    const usuario = document.querySelector('.editarUsuarioModificar').value;
    const password = document.querySelector('.editarContrasenaUsuario').value;
    const email = document.querySelector('.editarEmailUsuario').value;
    const telefono = document.querySelector('.editarTelefonoUsuario').value;
    const direccion = document.querySelector('.editarDomicilioUsuario').value;

    try {

        const ext = '/usuarios/';
        const cuerpo = {
            "id": id,
            "nombre": nombre,
            "apellido": apellido,
            "usuario": usuario,
            "password": password,
            "email": email,
            "telefono": telefono,
            "direccion": direccion
        };

        const metodo = 'PUT';

        let editarUsuario = await fetcheo(url, ext, cuerpo, metodo);

        if (editarUsuario.mensaje) {

            $('#editarUsuario').modal('hide');

            $('#editarUsuario').on('hidden.bs.modal', function (e) {
                $(this)
                    .find("input,select")
                    .val('')
                    .end();
            })

            Swal.fire("Editado!", "Usuario Editado Correctamente.", "success");
            document.querySelector(".divTabla").innerHTML = "";

        } else if (editarUsuario.error) { Swal.fire("Atencion", editarUsuario.error, "error"); }

    } catch (err) {
        Swal.fire("Atencion", error, "error");
    }


});
