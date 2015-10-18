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

## Ejemplo Traer listado de tareas

```javascript
consumeServicios(1, "", function(data){
    console.log(data);
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
