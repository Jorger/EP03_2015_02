$(function()
{
	var numPregunta = 0, //El indice del array de preguntas...
		contPregunta = 0, //El número de la pregunta, que se consultará al servicio...
		tiempo = 0, //Guardará el valor del setInterval
		cuentaTiempo = 0, //Contador del tiempo...
		preguntas = [], //Almacena las preguntas que provienen del servicio...
		seleccionado = false; //Indica si se ha seleccionado una respuesta...

	//Para los servicios que se consumirán...
    var nomServicios = [
							{
								servicio 	: 	"Trae todas las Preguntas",
								urlServicio	: 	"getQuestions",
								metodo		: 	"GET"
							},
							{
								servicio 	: 	"Validar una respuesta",
								urlServicio	: 	"isValid",
								metodo		: 	"POST"
							}
						];
	//Función que invoca los servicios del Backend...
    var consumeServicios = function(tipo, val, callback)
	{
		var servicio = {
							url 	: nomServicios[tipo - 1].urlServicio,
							metodo	: nomServicios[tipo - 1].metodo,
							datos 	: tipo === 1 ? "" : JSON.stringify(val)
						};
		//Invocar el servicio...
		$.ajax(
		{
			url 		: servicio.url,
			type 		: servicio.metodo,
			data 		: servicio.datos,
			dataType 	: "json",
			contentType: "application/json; charset=utf-8"
		}).done(function(data)
		{
            callback(data);
		});
	};

	//Traer las preguntas...
	consumeServicios(1, "", function(data){
		$("#fade").hide();
		$("#loading").hide();
		preguntas = data;
		cargarPregunta();
	});

	//Para cargar una pregunta del vector de preguntas...
	var cargarPregunta = function()
	{
		var miPregunta = preguntas[contPregunta];
		$("#titulo").html("Pregunta Nº " + (contPregunta + 1));
		$("#pregunta").html(miPregunta.pregunta);
		//Guardar el número de la pregunta que se está usando...
		numPregunta = miPregunta.numpregunta;
		//Para el tiempo...
		cuentaTiempo = 60;
		tiempo = setInterval(function(){
			cuentaTiempo--;
			$("#tiempo").html((cuentaTiempo <= 9 ? "0" + cuentaTiempo : cuentaTiempo) + "'");
			if(cuentaTiempo <= 0)
			{
				validaRespuesta(0);
			}
		}, 1000);
		//Para cargar las opciones de respuesta...
		for(var i = 1; i <= 4; i++)
		{
			$("#opcion_" + i).html(miPregunta["opcion" + i])
			.click(function(event){
				if(!seleccionado)
				{
					validaRespuesta(Number(this.id.split("_")[1]));
				}
			}).hide()
			  .delay(i * 100)
			  .fadeIn('slow')
			  .removeClass("correcto incorrecto");
		}
	};

	//Para validar la respuesta del usaurio...
	var validaRespuesta = function(respuesta)
	{
		$("#fade").show();
		$("#loading").show();
		seleccionado = true;
		//Se detiene el tiempo...
		$("#tiempo").html("60'");
		clearInterval(tiempo);
		//Servicio que validará si la respuesta es correcta o no...
		var validaRespuesta = {
									numPregunta : numPregunta,
									respuesta : respuesta
							  };
		consumeServicios(2, validaRespuesta, function(data)
		{
			$("#fade").hide();
			$("#loading").hide();
			//Guarda la respuesta correcta que viene del servicio..
			var respuestaCorrecta = data.respuestaCorrecta;
			if(data.correcto)
			{
				$("#opcion_" + respuesta).addClass('correcto');
			}
			else
			{
				$("#opcion_" + respuestaCorrecta).addClass('correcto');
				if(respuesta !== 0)
				{
					$("#opcion_" + respuesta).addClass('incorrecto');
				}
			}
			//Mostrar el mensaje de correcto o incorrecto...
			$("#mensaje").html(data.correcto ? "CORRECTO :)" : "INCORRECTO :(")
						 .css({color: data.correcto ? "#73BF43" : "#EB1C24"})
						 .show('fast')
						 .delay(2000)
						 .hide('fast', function()
						 {
							seleccionado = false;
							contPregunta++;
						 	if(contPregunta < preguntas.length)
						 	{
						 		cargarPregunta();
						 	}
						 	else
						 	{
						 		swal(
						 		{
						 			title: "Preguntas",
						 			text: "No hay más preguntas",
						 			showCancelButton: false,
						 			confirmButtonColor: "#DD6B55",
						 			confirmButtonText: "Aceptar",
						 			closeOnConfirm: false,
						 			type: "error",
						 		},
						 		function()
						 		{
						 			swal({title: "Cargando",   text: "Recargando página",   timer: 500,   showConfirmButton: false });
						 			location.reload();
						 		});
						 	}
						});
		});
	};
});
