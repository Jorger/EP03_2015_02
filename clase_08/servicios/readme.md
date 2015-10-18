# Consumir Servicios desde el Front

Script que ayudará a consumir los [servicios REST].

## Función consumeServicios

Función que recibe tres parámetros;

1. El tipo de acción a realizar, tomados del array de [nomServicios]
2. Las valores a enviar.
3. CallBack que se ejecutará una vez la función ha terminado.

```javascript
consumeServicios(tipo, valores, function(){
    //Datos recibe del servicio...
});
```

## Ejemplos 

### Traer listado de tareas

```javascript
var todos = [];
consumeServicios(1, "", function(data){
    todos = data;
});
```

### Crear una nueva tarea.

```javascript
var newToDo = {finish : false, task : "Nueva tarea"};
consumeServicios(2, newToDo, function(data){
    todos.push(data);
});
```

### Editar/cambiar de estado una tarea.

```javascript
var updateData = {
                    "id"        : "123456",
                    "finish"    : true,
                    "field"     : "finish"
                };
consumeServicios(3, updateData, function(data){
    console.log("Actualizada, actualizar to-do")
});
```

### Eliminar una tarea.

```javascript
consumeServicios(4, "123456", function(data){
    console.log("Eliminada, actualizar to-do")
});
```


### Autor
Jorge Rubaino

[@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
[nomServicios]:https://github.com/Jorger/EP03_2015_02/blob/master/clase_08/servicios/services.js#L2
[servicios REST]:https://github.com/Jorger/EP03_2015_02/tree/master/clase_08/backend
