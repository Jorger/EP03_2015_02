window.onload = function()
{
	listadoPersonas = [];
	var indEdita = -1; //El índice de Edición...
	var elementos = ["identifica", "nombre", "apellido", "email", "fechanace"];
	//Constructor Persona...
	function persona(id, pn, pa, em, fe)
	{
		this.identificacion = id;
		this.primernombre = pn;
		this.primerapellido = pa;
		this.email = em;
		this.fechanacimiento = fe;
		this.calculaEdad = function()
		{
			var fecha_actual = new Date();
			var parteFn = this.fechanacimiento.split("-");
			var fechaCompara = new Date(parteFn[0], parteFn[1], parteFn[2]); //año, mes día
			return Math.floor((fecha_actual - fechaCompara) / 1000 / 3600 / 24 / 365);
			//Milisegundos, segundos en una hora, horas en un día, días en un año...
		}
		//Para devolver los datos del usuario a ser impresos...
		this.imprime = function()
		{
			return [
						this.identificacion, 
						this.primernombre + " " + this.primerapellido, 
						this.email, 
						this.fechanacimiento, 
						this.calculaEdad()
					];
		}
	}

	//Para cargar la información de localStorage...
	if(localStorage.getItem("listado"))
	{
		var objTMP = eval(localStorage.getItem("listado"));
		var id = pn = pa = em = fn = "";
		for(var i in objTMP)
		{
			var id = objTMP[i].identificacion;
			var pn = objTMP[i].primernombre;
			var pa = objTMP[i].primerapellido;
			var em = objTMP[i].email;
			var fn = objTMP[i].fechanacimiento;
			var nuevaPersona = new persona(id, pn, pa, em, fn);
			listadoPersonas.push(nuevaPersona);
		}
	}
	//imprimeUsuarios();
	//Imprimer usuarios en pantalla...
	var imprimeUsuarios = (function imprimeUsuarios()
	{
		var txt = "<table class = 'table-fill'>" + 
					"<thead><tr>" + 
					"<th>ID</th>" + 
					"<th>Nombre</th>" + 
					"<th>Correo</th>" + 
					"<th>Fecha</th>" +
					"<th>Edad</th>" + 
					"<th>Editar</th>" + 
					"<th>Eliminar</th></tr></thead>" + 
					"<tbody class = 'table-hover'>";
		for(var i = 0; i < listadoPersonas.length; i++)
		{
			txt += "<tr>";
			var datosPersona = listadoPersonas[i].imprime();
			for(var c = 0; c < datosPersona.length; c++)
			{
				txt += "<td><center>"+(datosPersona[c])+"</center></td>";
			}
			//Editar...
			txt += "<td><center>";
			txt += "<img src = 'img/editar.png' border = '0' id = 'e_"+i+"'/>";
			txt += "</center</td>";
			//Eliminar...
			txt += "<td><center>";
			txt += "<img src = 'img/eliminar.png' border = '0' id = 'd_"+i+"'/>";
			txt += "</center</td>";
			txt += "</tr>";
		}
		txt += "</tbody></table>";
		nom_div("imprime").innerHTML = txt;
		//Poner las acciones de editar y eliminar...
		for(var i = 0; i < listadoPersonas.length; i++)
		{
			
			//Editar...
			nom_div("e_" + i).addEventListener('click', function(event)
			{
				var ind = event.target.id.split("_")[1];
				var idUser = listadoPersonas[ind].identificacion;
				console.log("Valor de idUser: ", idUser);
				ind = buscaIndice(idUser);
				if(ind >= 0)
				{
					nom_div("identifica").value = listadoPersonas[ind].identificacion;
					nom_div("nombre").value = listadoPersonas[ind].primernombre;
					nom_div("apellido").value = listadoPersonas[ind].primerapellido;
					nom_div("email").value = listadoPersonas[ind].email;
					nom_div("fechanace").value = listadoPersonas[ind].fechanacimiento;
					indEdita = ind;
				}
				else
				{
					alert("No existe el ID");
				}
			});
			//Eliminar...
			nom_div("d_" + i).addEventListener('click', function(event)
			{
				var ind = event.target.id.split("_")[1];
				var idUser = listadoPersonas[ind].identificacion;
				if(confirm("¿Está segur@ de realizar está acción?"))
				{
					ind = buscaIndice(idUser);
					if(ind >= 0)
					{
						listadoPersonas.splice(ind, 1);
						localStorage.setItem("listado", JSON.stringify(listadoPersonas));
						indEdita = -1;
						imprimeUsuarios();
					}
				}
			});
		}
		return imprimeUsuarios;
	})();
	//Dada la identificación, buscar la posición donde se encuentra almacenado...
	var buscaIndice = function(id)
	{
		var indice = -1;
		for(var i in listadoPersonas)
		{
			if(listadoPersonas[i].identificacion === id)
			{
				indice = i;
				break;
			}
		}
		return indice;
	}

	//Limpia los campos del formulario...
	var limpiarCampos = function()
	{
		indEdita = -1; //No se está editando nada...
		for(var i = 0; i < elementos.length; i++)
		{
			nom_div(elementos[i]).value = "";	
		}
	}

	//Saber si un usuario ya existe, bien por identificación o por e-mail...
	function existeUsuario(id, email)
	{
		var existe = 0; //0 Ningún campo existe...
		for(var i in listadoPersonas)
		{
			//Cédula...
			if(i !== indEdita)
			{
				if(listadoPersonas[i].identificacion === id)
				{
					existe = 1; // la cédula existe...
					break;
				}
				//Correo existe...
				if(listadoPersonas[i].email.toLowerCase() === email.toLowerCase())
				{
					existe = 2; //El correo existe...
					break;
				}
			}
		}
		return existe;
	}

	//Acciones sobre el botón guardar...
	nom_div("guarda").addEventListener('click', function(event)
	{
		var correcto = true;
		var valores = [];
		for(var i = 0; i < elementos.length; i++)
		{
			if(nom_div(elementos[i]).value === "")
			{
				alert("Digite todos los campos");
				nom_div(elementos[i]).focus();
				correcto = false;
				break;
			}
			else
			{
				valores[i] = nom_div(elementos[i]).value;
			}
		}
		//Si correcto es verdadero...
		if(correcto)
		{
			var existeDatos = existeUsuario(valores[0], valores[3]);
			if(existeDatos === 0) //No existe...
			{
				if(ValidaEmail(valores[3]))
				{
					//No se estaba editando...
					if(indEdita < 0)
					{
						var nuevaPersona = new persona(valores[0], valores[1], valores[2], valores[3], valores[4]);
						listadoPersonas.push(nuevaPersona);
					}
					else
					{
						listadoPersonas[indEdita].identificacion = valores[0];
						listadoPersonas[indEdita].primernombre = valores[1];
						listadoPersonas[indEdita].primerapellido = valores[2];
						listadoPersonas[indEdita].email = valores[3];
						listadoPersonas[indEdita].fechanacimiento = valores[4];
					}

					localStorage.setItem("listado", JSON.stringify(listadoPersonas));
					imprimeUsuarios();
					limpiarCampos();
				}
				else
				{
					alert("El correo no es válido");
					nom_div(elementos[3]).focus();
				}
			}
			else
			{
				if(existeDatos == 1)
				{
					alert("El usuario con la cédula: " + valores[0] + " Ya existe");
					nom_div(elementos[0]).focus();
				}
				else
				{
					alert("El correo : " + valores[3] + " Ya existe");
					nom_div(elementos[3]).focus();	
				}
			}
		}
	});

	//Función que valida que un e-mail se encuentre "sintácticamente" bien escrito...
	function ValidaEmail(email)
	{
		var correcto = true;
		var emailReg = /^([\da-zA-Z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		if(!emailReg.test(email))
		{
			correcto =  false;
		}
		return correcto;
	}

	//Accedera los elementos de HTML...
	function nom_div(div)
	{
		return document.getElementById(div);
	}
}