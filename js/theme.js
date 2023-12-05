/* ==========================================================================
   #GenerarCURP
   ========================================================================== */
function generarCURP(genero){
	if (genero == "M"){
		abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		random09a = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
		random09b = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
		randomAZ = Math.floor(Math.random() * (26 - 0 + 1)) + 0;
		ano = Number($("#fecha").val().slice(6, 10));

		var CURP = [];
		CURP[0] = $("#paterno").val().charAt(0).toUpperCase();
		CURP[1] = $("#paterno").val().slice(1).replace(/\a\e\i\o\u/gi, "").charAt(0).toUpperCase();
		CURP[2] = $("#materno").val().charAt(0).toUpperCase();
		CURP[3] = $("#nombre").val().charAt(0).toUpperCase();
		CURP[4] = ano.toString().slice(2);
		CURP[5] = $("#fecha").val().slice(3, 5);
		CURP[6] = $("#fecha").val().slice(0, 2);
		CURP[7] = "M";
		CURP[8] = abreviacion[estados.indexOf($("#estado").val().toLowerCase())];
		CURP[9] = $("#paterno").val().slice(1).replace(/[aeiou]/gi, "").charAt(0).toUpperCase();
		CURP[10] = $("#materno").val().slice(1).replace(/[aeiou]/gi, "").charAt(0).toUpperCase();
		CURP[11] = $("#nombre").val().slice(1).replace(/[aeiou]/gi, "").charAt(0).toUpperCase();
		document.getElementById('whCurp').value = CURP.join("");

		return CURP.join("");

	} else if (genero == "H"){
		abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		random09a = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
		random09b = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
		randomAZ = Math.floor(Math.random() * (26 - 0 + 1)) + 0;
		ano = Number($("#fecha").val().slice(6, 10));

		var CURP = [];
		CURP[0] = $("#paterno").val().charAt(0).toUpperCase();
		CURP[1] = $("#paterno").val().slice(1).replace(/\a\e\i\o\u/gi, "").charAt(0).toUpperCase();
		CURP[2] = $("#materno").val().charAt(0).toUpperCase();
		CURP[3] = $("#nombre").val().charAt(0).toUpperCase();
		CURP[4] = ano.toString().slice(2);
		CURP[5] = $("#fecha").val().slice(3, 5);
		CURP[6] = $("#fecha").val().slice(0, 2);
		CURP[7] = "H";
		CURP[8] = abreviacion[estados.indexOf($("#estado").val().toLowerCase())];
		CURP[9] = $("#paterno").val().slice(1).replace(/[aeiou]/gi, "").charAt(0).toUpperCase();
		CURP[10] = $("#materno").val().slice(1).replace(/[aeiou]/gi, "").charAt(0).toUpperCase();
		CURP[11] = $("#nombre").val().slice(1).replace(/[aeiou]/gi, "").charAt(0).toUpperCase();
		document.getElementById('whCurp').value = CURP.join("");

		return CURP.join("");
	}
	}
	var estados = ["aguascalientes","baja california","baja california sur","campeche","chiapas","chihuahua","coahuila","colima","ciudad de mexico","distrito federal","durango","guanajuato","guerrero","hidalgo","jalisco","estado de mexico","michoacan","morelos","nayarit","nuevo leon","oaxaca","puebla","queretaro","quintana roo","san luis potosi","sinaloa","sonora","tabasco","tamaulipas","tlaxcala","veracruz","yucatan","zacatecas","ne"];
	var abreviacion = ["AS","BC","BS","CC","CS","CH","CL","CM","CX","DF","DG","GT","GR","HG","JC","MC","MN","MS","NT","NL","OC","PL","QT","QR","SP","SL","SR","TC","TS","TL","VZ","YN","ZS","NE"];

/* ==========================================================================
   #validarCURP
   ========================================================================== */
function curpValida(curp) {
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);

    if (!validado)  
    	return false;

    function digitoVerificador(curp17) {

        var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
            lngSuma      = 0.0,
            lngDigito    = 0.0;
        for(var i=0; i<17; i++)
            lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - lngSuma % 10;
        if (lngDigito == 10) return 0;
        return lngDigito;
    }

    if (validado[2] != digitoVerificador(validado[1])) 
    	return false;

    return true; 
}

function validarInput(input) {
    var curp = input.value.toUpperCase(),
        resultado = document.getElementById("resultado"),
        valido = "No válido";

    if (curpValida(curp)) {
    	valido = "Válido";
        resultado.classList.add("ok");
    } else {
    	resultado.classList.remove("ok");
    }
    resultado.innerText = "\nFormato: " + valido;
}

/* ==========================================================================
   #file
   ========================================================================== */
;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});
	});
}( document, window, 0 ));

/* ==========================================================================
   #tabla
   ========================================================================== */
   
/* ==========================================================================
   #login
   ========================================================================== */

   //Ejecutando funciones


//Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

    //FUNCIONES

function anchoPage(){

    if (window.innerWidth > 850){
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    }else{
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";   
    }
}

anchoPage();


    function iniciarSesion(){
        if (window.innerWidth > 850){
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "10px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.opacity = "1";
            caja_trasera_login.style.opacity = "0";
        }else{
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.display = "block";
            caja_trasera_login.style.display = "none";
        }
    }

    function register(){
        if (window.innerWidth > 850){
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "410px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.opacity = "0";
            caja_trasera_login.style.opacity = "1";
        }else{
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.display = "none";
            caja_trasera_login.style.display = "block";
            caja_trasera_login.style.opacity = "1";
        }

    
}