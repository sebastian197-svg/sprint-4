const btnLogin = document.querySelector('.btnLogin');
const btnIngresar = document.querySelector('.btnIngresar');
const btnRegistrar = document.querySelector('.btnRegistrar');
const btnSalir = document.querySelector('.btnSalir');
const btnUsuarios = document.querySelector('.btnUsuarios');
const btnContactos = document.querySelector('.btnContactos');
const btnCompania = document.querySelector('.btnCompanias');
const btnPais = document.querySelector('.btnPais');
const contenidoMostrar = document.querySelector(".contenido_mostar");
const btnBuscarContacto = document.querySelector(".btnBuscarContacto");
const btnCrearContacto = document.querySelector(".btnCrearContacto");
const btnEditarContacto = document.querySelector(".btnEditarContacto");
const btnBuscarUsuario = document.querySelector(".btnBuscarUsuario");
const btnCrearUsuario = document.querySelector(".btnCrearUsuario");
const btnEditarUsuario = document.querySelector(".btnEditarUsuario");
const btnCrearPais = document.querySelector(".btnCrearPais");
const btnInicio = document.querySelector(".btnInicio");
const btnCrearCompania = document.querySelector(".btnCrearCompania");


const url = 'http://127.0.0.1:3001';

const fetcheo = async (url, ext, cuerpo, metodo) => {

    if (metodo == "GET") {
        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));
        const respuesta = await fetch(url + ext, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': bearer
            }
        });

        data = await respuesta.json();
        return await data;

    } else {

        const bearer = 'Bearer ' + JSON.parse(localStorage.getItem('Token'));	
        const respuesta = await fetch(url + ext, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': bearer
            },
            body: JSON.stringify(cuerpo)
        });

        data = await respuesta.json();
        return await data;

    }



}

btnIngresar.addEventListener('click', async (e) => {

    e.preventDefault();

    const usuario = document.querySelector('.usuario').value;
    const contrasena = document.querySelector('.password').value;

    try {
        const ext = '/ingreso';
        const cuerpo = {
            "usuario": usuario,
            "password": contrasena
        };
        const metodo = 'POST';

        let ingreso = await fetcheo(url, ext, cuerpo, metodo);

        if (ingreso.token) {
            btnIngresar.classList.add("btn-warning");
            btnIngresar.classList.remove("btn-success");
            btnIngresar.innerHTML = `Bienvenid@ al sitio ${usuario}`;
            btnLogin.disabled = true;
            $(".btnSalir").hide();
            $(".btnLogin").hide();
            $("#navbarResponsive ul li").show();
            if(!ingreso.admin){
                $(".btnUsuarios").hide();
            }
            localStorage.setItem("Token", JSON.stringify(ingreso.token));
            localStorage.setItem("Usuario", JSON.stringify(usuario));
            localStorage.setItem("Admin", JSON.stringify(ingreso.admin));

            setTimeout(function () {
                $('#login').modal('hide');
                $(".btnIngreso").prop('disabled', true);
                $(".btnRegistro").prop('disabled', true);
            }, 1000);

        } else {
            alert(ingreso.error);
        }

    } catch (err) {

    }


});

btnRegistrar.addEventListener('click', async (e) => {

    e.preventDefault();

    const usuario = document.querySelector('.nuevoUsuario').value;
    const nombre = document.querySelector('.nuevoNombre').value;
    const apellido = document.querySelector('.nuevoApellido').value;
    const email = document.querySelector('.nuevoEmail').value;
    const telefono = document.querySelector('.nuevoTelefono').value;
    const direccion = document.querySelector('.nuevoDomicilio').value;
    const password = document.querySelector('.nuevoPassword').value;

    try {

        const ext = '/usuarios/';
        const cuerpo = {
            "usuario": usuario,
            "nombre": nombre,
            "apellido": apellido,
            "email": email,
            "telefono": telefono,
            "direccion": direccion,
            "password": password
        };

        const metodo = 'POST';

        let registro = await fetcheo(url, ext, cuerpo, metodo);

        if (registro.mensaje) {

            $(".btnRegistrar").addClass("btn-warning").removeClass("btn-success");
            $(".btnRegistrar").html('Registrad@ !!');
            $(".btnRegistro").prop('disabled', true);
            $(".btnRegistro").html('Registrad@ !!');

            setTimeout(function () {
                $('#registro').modal('hide');
                $(".btnRegistrar").prop('disabled', true);
            }, 2000);

        } else if (registro.error) { alert(registro.error); }

    } catch (err) {
        alert(err)
    }


});


btnSalir.addEventListener('click', async (e) => {
    e.preventDefault();
    localStorage.clear();
    btnIngresar.classList.add("btn-success");
    btnIngresar.classList.remove("btn-warning");
    btnIngresar.innerHTML = `Ingresar`;
    btnLogin.disabled = false;
    $("#navbarResponsive ul li").hide();
    contenidoMostrar.innerHTML = "";
});


document.addEventListener("DOMContentLoaded", function (event) {

    if (localStorage.getItem("Token") !== null) {

        $(".btnIngreso").prop('disabled', true);
        $(".btnRegistro").prop('disabled', true);
        $("#navbarResponsive ul li").show();


    } else {

        $("#navbarResponsive ul li").hide();
        $('#login').modal('show');
    }

    if (localStorage.getItem("Admin") == false) {

        $(".btnUsuarios").hide();

    }

});

$(document).ready(function() {
    $('select').selectpicker();
});

