var listadoPersonas = [];
//Constructor...
function persona(datos)
{
	this.id = datos.id;
	this.primernombre = datos.primernombre;
	this.primerapellido = datos.primerapellido;
	this.email = datos.email;
	this.imprime = function()
	{
		return this.primernombre + " " + this.primerapellido;
	}
}

var nombres = ["asdad", "fsdfsd", "sdfsdf"];
var apellidos = ["asdad", "fsdfsd", "sdfsdf"];
for(var i = 1; i <= 10; i++)
{
	listadoPersonas.push(new persona(
									{
										id : "1234", 
										primernombre : nombres[Math.floor(Math.random * nombres.length), 
										primerapellido : "Rubiano", 
										email : "jorge@correo.com"
									}

	));
}




new persona({
					id : "4345", 
					primernombre : "Juan", 
					primerapellido : "Perez", 
					email : "jorge@corre2.com"
			});



var 


/*
		return [
					this.id, 
					this.primernombre + " " + this.primerapellido, 
					this.email
				];
*/