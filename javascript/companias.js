
const getHtmlCompanias = (companias) => {

    let html = "";
  
    if (companias.error) {
      Swal.fire("Atencion", companias.error, "error");
    }
  
    if (companias.length > 0) {
  
      html = `<table class="table table-bordered table-hover dt-responsive tablas">
      <thead>
        <tr>
          <th scope="col">Nombre</th>
        </tr>
      </thead>
      <tbody>
    `;
  
  
    companias.forEach(compania => {
  
        html += `<tr>
           <td>${compania.nombre}</td>
         </tr>`
  
      });
  
      html += `  
     
       </tbody>
     </table>`;
  
    }
  
    return html;
  
  }
  
  btnCompania.addEventListener('click', async (e) => {
    e.preventDefault();
    $(".inicio").hide();
  
    contenidoMostrar.innerHTML = ` 
    <div class="alert alert-success" role="alert">Listado de Compañias</div>`
    if (localStorage.getItem("Admin") == 'true') {
      contenidoMostrar.innerHTML += `<div class="d-flex justify-content-center"><button type="button" class="btn btn-success" id="crearCompania" data-toggle="modal" data-target="#nuevaCompania">Crear Compañia</button></div><br>`;
    }
    const divTabla = document.createElement("div");
    divTabla.classList.add("divTabla")
    contenidoMostrar.appendChild(divTabla);
  
    divTabla.innerHTML = "";
  
    const ext = '/companias/';
    const cuerpo = {};
  
    const metodo = 'GET';
  
    let companias = await fetcheo(url, ext, cuerpo, metodo);
  
    if (companias.error) { Swal.fire("Atencion", companias.error, "error") }
    if (companias) {
      const tabla = getHtmlCompanias(companias);
      divTabla.innerHTML = tabla;
  
  
    } else if (companias.error) { Swal.fire("Atencion", companias.error, "error"); }
    else { Swal.fire("Atencion", companias.error, "error"); }
  
  });
  
  btnCrearCompania.addEventListener('click', async (e) => {
  
    e.preventDefault();
    const nombre = document.querySelector('.nuevoNombreCompania').value;
  
  
    try {
  
      const ext = '/crearCompania/';
      const cuerpo = {
        "nombre": nombre
  
      };
      const metodo = 'POST';
  
      let crearCompania = await fetcheo(url, ext, cuerpo, metodo);
  
      if (crearCompania.mensaje) {
  
        $('#nuevaCompania').modal('hide');
  
        $('#nuevaCompania').on('hidden.bs.modal', function (e) {
          $(this)
            .find("input,select")
            .val('')
            .end();
        })
  
        Swal.fire("Creado!", "Compañia Creada Correctamente.", "success");
        document.querySelector(".divTabla").innerHTML = "";
  
      } else if (crearCompania.error) { Swal.fire("Atencion", crearCompania.error, "error"); }
  
    } catch (err) {
      Swal.fire("Atencion", error, "error");
    }
  
  
  });