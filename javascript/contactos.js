const getHtml = (contactos) => {
    let html = "";

    if (contactos.error) {

        Swal.fire("Atencion", contactos.error, "error");

    }

    if (contactos.length > 0) {
        html = `<table class="table table-bordered table-hover dt-responsive tablas">
    <thead>
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Apellido</th>
        <th scope="col">Email</th>
        <th scope="col">Telefono</th>
        <th scope="col">Region</th>
        <th scope="col">Pais</th>
        <th scope="col">Ciudad</th>
        <th scope="col">Compania</th>
        <th scope="col">Cargo</th>
        <th scope="col">Canal</th>`
        if (localStorage.getItem("Admin") == 'true') {
            html += `<th scope="col">Acciones</th>`
        }
        html += `</tr>
    </thead>
    <tbody>
  `;

        contactos.forEach(contacto => {

            const arrayCanalPreferido = contacto.canal_preferido.split(',');

            html += `<tr>
         <td>${contacto.nombre}</td>
         <td>${contacto.apellido}</td>
         <td>${contacto.email}</td>
         <td>${contacto.telefono}</td>
         <td>${contacto.region}</td>
         <td>${contacto.pais}</td>
         <td>${contacto.ciudad}</td>
         <td>${contacto.compania}</td>
         <td>${contacto.cargo}</td>
         <td>`;

            arrayCanalPreferido.forEach(element => {

                if (element == "Telefono") { html += ` <span class="badge badge-warning">${element}</span> `; }
                else if (element == "Email") { html += ` <span class="badge badge-danger">${element}</span> `; }
                else if (element == "Whatsapp") { html += ` <span class="badge badge-success">${element}</span> `; }
                else if (element == "Facebook") { html += ` <span class="badge badge-primary">${element}</span> `; }
                else if (element == "Twitter") { html += ` <span class="badge badge-info">${element}</span> `; }
                else { html += ` <span class="badge badge-secondary">${element}</span> `; }

            });
            if (localStorage.getItem("Admin") == 'true') {
                html += `
         </td>
         <td>
         <button type="button" class="btn btn-outline-warning btn-sm btnEditarContacto" idContacto="${contacto.id}" onClick="vistaEditarContacto(event)">Editar</button>
         <button type="button" class="btn btn-outline-danger btn-sm btnEliminarContacto" nombreContacto="${contacto.nombre + " " + contacto.apellido}" idContacto="${contacto.id}" onClick="eliminarContacto(event)" >Eliminar</button>
         </td>
       </tr>`
            }
        });

        html += `  
   
     </tbody>
   </table>`;

    }

    return html;

}

btnContactos.addEventListener('click', async (e) => {
    e.preventDefault();
    $(".inicio").hide();
    const divBusqueda = document.createElement("div");
    divBusqueda.classList.add("divBusqueda");
    if (localStorage.getItem("Admin") == 'true') {
        divBusqueda.innerHTML += `
    <div class="d-flex justify-content-center"><button type="button" class="btn btn-success contacto" data-toggle="modal" data-target="#nuevoContacto">Crear Contacto</button></div>`
    }
    divBusqueda.innerHTML += `
      <form>
      <div class="input-group busquedaContacto d-flex justify-content-around">
      <input type="text" class="form-control col-4" id="nombreBusqueda" placeholder="Nombre" >
      <input type="text" class="form-control col-4" id="apellidoBusqueda" placeholder="Apellido">
      <input type="text" class="form-control col-4" id="emailBusqueda" placeholder="Email">
      <input type="text" class="form-control col-4" id="paisBusqueda" placeholder="Pais">
      <input type="text" class="form-control col-4" id="regionBusqueda" placeholder="Region">
      <input type="text" class="form-control col-4" id="companiaBusqueda" placeholder="Compania">
      <button type="submit" class="btn btn-primary" id="buscarContacto" onClick="buscarContactos(event)" >Buscar</button>
      <button type="reset" class="btn btn-danger" id="borrar" >Limpiar</button>
      </div>
    </form>

  `;

    contenidoMostrar.innerHTML = '<div class="alert alert-info" role="alert">Listado de Contactos</div>';
    contenidoMostrar.appendChild(divBusqueda);

    const divTabla = document.createElement("div");
    divTabla.classList.add("divTabla")
    contenidoMostrar.appendChild(divTabla);
    const extregion = '/paisesr/';
    const extcompania = '/companias/';
    const cuerpo = {};
    const metodo = 'GET';
    let contacto = document.querySelector(".contacto");
    const claseRegion = ".selectNuevoRegionContacto";
    const selectorRegion = document.querySelector(claseRegion);
    const claseCompania = ".selectNuevoCompania";
    const selectorCompania = document.querySelector(claseCompania);
    if (localStorage.getItem("Admin") == 'true') {
        contacto.addEventListener("click", async (e)=>{
            const regiones = await fetcheo(url, extregion, cuerpo, metodo);
            const companias = await fetcheo(url, extcompania, cuerpo, metodo);
            mostrarRegion(await regiones, selectorRegion, claseRegion);
            buscarPais();
            mostrarCompanias(await companias, selectorCompania, claseCompania);
        });
    }  
    
});

async function mostrarRegion(regiones, selector, claseRegion) {
    if (claseRegion === ".selectNuevoRegionContacto") {
        select = "<select class='selectpicker nuevoRegionContacto' id='nuevoRegionContacto' data-live-search='true' title='Elija Region...'>";
        
    } else {

        select = "<select class='selectpicker editarRegionContacto' id='editarRegionContacto' data-live-search='true' title='Elija Region...'>";

    }

    regiones.forEach((region) => {
        select += `<option value="${region.idregion}">${region.nombre}</option>`;
    });

    select += "</select>"

    selector.innerHTML = select;

    $('#nuevoRegionContacto').html(select).selectpicker('refresh');
    $('#editarRegionContacto').html(select).selectpicker('refresh');

    

};

async function buscarPais(e){
    let id;
    let btnpaises = document.getElementById("nuevoRegionContacto");
    btnpaises.addEventListener('change', async (e)=>{
           id = document.getElementById("nuevoRegionContacto").value;
           const clasePais = ".selectNuevoPaisContacto";
           const selectorPais = document.querySelector(clasePais);
        const metodo = 'POST';
        const extpais = '/paisesp/';
        cuerpo = {"id":id}
        const paises = await fetcheo(url, extpais, cuerpo, metodo)
        mostrarPais(await paises, selectorPais, clasePais);
        buscarCiudad();
    });
        
   
};

async function mostrarPais(paises, selector, clasePais) {
    if (clasePais === ".selectNuevoPaisContacto") {
        select = "<select class='selectpicker nuevoPaisContacto' id='nuevoPaisContacto' data-live-search='true' title='Elija otro...'>";
        
    } else {

        select = "<select class='selectpicker editarPaisContacto' id='editarPaisContacto' data-live-search='true' title='Elija Pais...'>";

    }

    paises.forEach((pais) => {
        select += `<option value="${pais.idpais}">${pais.nombre}</option>`;
    });

    select += "</select>"

    selector.innerHTML = select;

    $('#nuevoPaisContacto').html(select).selectpicker('refresh');
    $('#editarPaisContacto').html(select).selectpicker('refresh');

};

async function buscarCiudad(e){
    let id;
    let btnpaises = document.getElementById("nuevoPaisContacto");
    btnpaises.addEventListener('change', async (e)=>{
        id = document.getElementById("nuevoPaisContacto").value;
        const claseCiudad = ".selectNuevoCiudadContacto";
        const selectorCiudad = document.querySelector(claseCiudad);
        const metodo = 'POST';
        const extciudad = '/paisesc/';
        cuerpo = {"id":id}
        const ciudades = await fetcheo(url, extciudad, cuerpo, metodo);
        mostrarCiudad(await ciudades, selectorCiudad, claseCiudad);
    });
        
        
};

async function mostrarCiudad(ciudades, selector, claseCiudad) {
    if (claseCiudad === ".selectNuevoCiudadContacto") {
        select = "<select class='selectpicker nuevoCiudadContacto' id='nuevoCiudadContacto' data-live-search='true' title='Elija otro...'>";
        
    } else {

        select = "<select class='selectpicker editarCiudadContacto' id='editarCiudadContacto' data-live-search='true' title='Elija Pais...'>";

    }

    ciudades.forEach((ciudad) => {
        select += `<option value="${ciudad.idciudad}">${ciudad.nombre}</option>`;
    });

    select += "</select>"

    selector.innerHTML = select;

    $('#nuevoCiudadContacto').html(select).selectpicker('refresh');
    $('#editarCiudadContacto').html(select).selectpicker('refresh');

    

};

async function mostrarCompanias(companias, selector, claseCompania) {
    if (claseCompania === ".selectNuevoCompania") {
        select = "<select class='selectpicker NuevoCompania' id='NuevoCompania' data-live-search='true' title='Elija Compañia...'>";
        
    } else {

        select = "<select class='selectpicker editarCompania' id='editarCompania' data-live-search='true' title='Elija Pais...'>";

    }

    companias.forEach((compania) => {
        select += `<option value="${compania.idcompania}">${compania.nombre}</option>`;
    });

    select += "</select>"

    selector.innerHTML = select;

    $('#NuevoCompania').html(select).selectpicker('refresh');
    $('#editarCompania').html(select).selectpicker('refresh');

    

};


async function buscarContactos(e) {
    const divTabla = document.querySelector(".divTabla");

    e.preventDefault();

    try {

        divTabla.innerHTML = "";
        const nombre = document.querySelector('#nombreBusqueda').value;
        const apellido = document.querySelector('#apellidoBusqueda').value;
        const email = document.querySelector('#emailBusqueda').value;
        const pais = document.querySelector('#paisBusqueda').value;
        const region = document.querySelector('#regionBusqueda').value;
        const compania = document.querySelector('#companiaBusqueda').value;

        const ext = '/contactosFiltro/';
        const cuerpo = {
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "pais": pais,
            "region": region,
            "compania": compania
        };

        const metodo = 'POST';

        let contactos = await fetcheo(url, ext, cuerpo, metodo);

        if (contactos) {

            const tabla = getHtml(contactos);
            divTabla.innerHTML = tabla;


        } else if (contactos.error) { alert(contactos.error); }
        else { alert("No hay contactos para mostar") }

    } catch (err) {
        alert(err)
    }


};

btnCrearContacto.addEventListener('click', async (e) => {
    e.preventDefault();
    const nombre = document.querySelector('.nuevoNombreContacto').value;
    const apellido = document.querySelector('.nuevoApellidoContacto').value;
    const email = document.querySelector('.nuevoEmailContacto').value;
    const telefono = document.querySelector('.nuevoTelefonoContacto').value;
    const region = document.querySelector('#nuevoRegionContacto').value;
    const pais = document.querySelector('#nuevoPaisContacto').value;
    const ciudad = document.querySelector('#nuevoCiudadContacto').value;
    const compania = document.querySelector('#NuevoCompania').value;
    const cargo = document.querySelector('.nuevoCargoContacto').value;
    const canal = document.querySelectorAll('#nuevoCanalContacto option:checked');
    const mapCanal = Array.from(canal).map(el => el.value);
    const valCanal = mapCanal.toString();

    try {

        const ext = '/contactos/';
        const cuerpo = {
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "telefono": telefono,
            "region": region,
            "pais": pais,
            "ciudad": ciudad,
            "compania": compania,
            "cargo": cargo,
            "canal_preferido": valCanal
        };
        const metodo = 'POST';

        let crearContacto = await fetcheo(url, ext, cuerpo, metodo);

        if (crearContacto.mensaje) {

            $('#nuevoContacto').modal('hide');

            $('#nuevoContacto').on('hidden.bs.modal', function (e) {
                $(this)
                    .find("input, select")
                    .val('')
                    .end();
            })

            $("#nuevoPaisContacto").val('default');
            $("#nuevoPaisContacto").selectpicker("refresh");


            Swal.fire("Creado!", "Contacto Creado Correctamente.", "success");
            document.querySelector(".divTabla").innerHTML = "";

        } else if (crearContacto.error) { alert(crearContacto.error); }

    } catch (err) {
        alert(err)
    }


});

async function vistaEditarContacto(e) {
    e.preventDefault();

    const idContacto = await e.target.attributes.idContacto.value;

    $('#editarContacto').modal('show');
    $('#editarContacto').on('hidden.bs.modal', function (e) {
        $(this)
            .find("input,select")
            .val('')
            .end();
    })

    try {
        const extregion = '/paisesr/';
        const extPais = '/paisesp/';
        const extCiudad = '/paisesc/';
        const extCompanias = '/companias/';
        const ext = '/contactosFiltro/';
        const cuerpo = {
            "id": idContacto
        };
        let cuerpo2;
        let id;
        const metodo = 'POST';
        const metodos = 'GET';
        const traerContacto = await fetcheo(url, ext, cuerpo, metodo);
        if (traerContacto) {
            const regiones = await fetcheo(url, extregion, cuerpo, metodos);
            const claseRegion = ".selectEditarRegionContacto";
            const selectorRegion = document.querySelector(claseRegion);
            mostrarRegion(await regiones, selectorRegion, claseRegion);
            consultarPais( regiones);
            const compania = await fetcheo(url, extCompanias, cuerpo, metodos);
            const claseCompania = ".selectEditarCompania";
            const selectorCompania = document.querySelector(claseCompania);
            mostrarCompanias(await compania, selectorCompania, claseCompania);

            const canalesPreferidos = traerContacto[0].canal_preferido.split(",");

            document.querySelector('.editarIdContacto').value = traerContacto[0].id;
            document.querySelector('.editarNombreContacto').value = traerContacto[0].nombre;
            document.querySelector('.editarApellidoContacto').value = traerContacto[0].apellido;
            document.querySelector('.editarEmailContacto').value = traerContacto[0].email;
            document.querySelector('.editarTelefonoContacto').value = traerContacto[0].telefono;
            document.querySelector('.editarRegionContacto').value = traerContacto[0].region;
            document.querySelector('.editarCargoContacto').value = traerContacto[0].cargo;
            document.querySelectorAll('.editarCanalContacto option').forEach(o => {

                if (canalesPreferidos.indexOf(o.value) != -1) {

                    o.selected = "selected";

                }

            });
            $('select[name=selValue]').val(1); $('.selectpicker').selectpicker('refresh');
        } else if (traerContacto.error) { alert(traerContacto.error); }

    } catch (err) {
        alert(err)
    }

};

async function eliminarContacto(e) {

    e.preventDefault();

    const idContacto = await e.target.attributes.idContacto.value;
    const nombreContacto = await e.target.attributes.nombreContacto.value;

    Swal.fire({
        title: `¿Está segur@ de borrar a ${nombreContacto}?`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Borrar`,
        denyButtonText: `NOOO !`,
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {

                const ext = '/contactos/';
                const cuerpo = {
                    "id": idContacto
                };

                const metodo = 'DELETE';

                const eliminarContacto = await fetcheo(url, ext, cuerpo, metodo);

                if (eliminarContacto.mensaje) {

                    Swal.fire("Eliminado!", "Contacto Eliminado Correctamente.", "success");
                    document.querySelector(".divTabla").innerHTML = "";


                } else if (crearContacto.error) { alert(crearContacto.error); }

            } catch (err) {
                alert(err)
            }

        } else if (result.isDenied) {
            Swal.fire("Cancelado!", "Operacion Cancelada", "info");
        }
    })

};

btnEditarContacto.addEventListener('click', async (e) => {
    e.preventDefault();

    const id = document.querySelector('.editarIdContacto').value;
    const nombre = document.querySelector('.editarNombreContacto').value;
    const apellido = document.querySelector('.editarApellidoContacto').value;
    const email = document.querySelector('.editarEmailContacto').value;
    const telefono = document.querySelector('.editarTelefonoContacto').value;
    const region = document.querySelector('#editarRegionContacto').value;
    const pais = document.querySelector('#editarPaisContacto').value;
    const ciudad = document.querySelector('#editarCiudadContacto').value;
    const compania = document.querySelector('#editarCompania').value;
    const cargo = document.querySelector('.editarCargoContacto').value;
    const canal = document.querySelectorAll('#editarCanalContacto option:checked');
    const mapCanal = Array.from(canal).map(el => el.value);
    const valCanal = mapCanal.toString();

    try {

        const ext = '/contactos/';
        const cuerpo = {
            "id": id,
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "telefono": telefono,
            "region": region,
            "pais": pais,
            "ciudad": ciudad,
            "compania": compania,
            "cargo": cargo,
            "canal_preferido": valCanal
        };

        const metodo = 'PUT';

        let editarContacto = await fetcheo(url, ext, cuerpo, metodo);

        if (editarContacto.mensaje) {

            $('#editarContacto').modal('hide');

            $('#editarContacto').on('hidden.bs.modal', function (e) {
                $(this)
                    .find("input,select")
                    .val('')
                    .end();
            })

            Swal.fire("Editado!", "Contacto Editado Correctamente.", "success");
            document.querySelector(".divTabla").innerHTML = "";

        } else if (editarContacto.error) { alert(editarContacto.error); }

    } catch (err) {
        alert(err)
    }


});

async function consultarPais(regiones){
    let id;
    let btnpaises = document.getElementById("editarRegionContacto");
    btnpaises.addEventListener('change', async (e)=>{
           id = document.getElementById("editarRegionContacto").value;
           const clasePais = ".selectEditarPaisContacto";
           const selectorPais = document.querySelector(clasePais);
        const metodo = 'POST';
        const extpais = '/paisesp/';
        cuerpo = {"id":id}
        const paises = await fetcheo(url, extpais, cuerpo, metodo)
       mostrarPais(await paises, selectorPais, clasePais);
       editarCiudad();
    });
    return id;
};

async function editarCiudad(e){
    let id;
    let btnpaises = document.getElementById("editarPaisContacto");
    btnpaises.addEventListener('change', async (e)=>{
        id = document.getElementById("editarPaisContacto").value;
        const claseCiudad = ".selectEditarCiudadContacto";
        const selectorCiudad = document.querySelector(claseCiudad);
        const metodo = 'POST';
        const extciudad = '/paisesc/';
        cuerpo = {"id":id}
        const ciudades = await fetcheo(url, extciudad, cuerpo, metodo);
        mostrarCiudad(await ciudades, selectorCiudad, claseCiudad);
    });
        
        
};