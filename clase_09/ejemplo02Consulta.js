var mysql      = require('mysql');
var conexion = mysql.createConnection({
  host     	: 'localhost',
  user     	: 'root',
  password 	: 'root',
  database 	: 'aplicacion'
});
conexion.connect();
//var sql = "select * from usuarios limit 0, 10";
//var sql = "select * from usuarios where identificacion = '37080418'";
var sql = "select nombre, apellido from usuarios where nombre like '%jo%' and apellido like '%s'";
conexion.query(sql, function(err, rows, fields)
{
	if (err) throw err;
	//console.log(fields);
	for(var i = 0; i < rows.length; i++)
	{
		console.log(rows[i]);
	}
});
conexion.end();
