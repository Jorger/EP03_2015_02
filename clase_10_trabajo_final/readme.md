# Trabajo Final Electiva Profesional III

Actividad basada en el juego [Trivia Crack] en la que se busca que el estudiante realice:

* Base de datos en Mysql, que contenga al menos 10 preguntas, de opción múltiple con única respuesta
* Servicio REST que entregue un listado de preguntas con sus opciones de respuesta, éste listado/Json **no deberá contener la respuesta correcta.**
* Servicio que reciba el número de la pregunta y la respuesta del usuario y retorne si se ha contestado de forma correcta.

### Base de la actividad.

Se entrega el Front de la aplicación, en este caso el diseño del Juego, así como la lógica que consumirá los servicios.

## Servicios.

Se deberán crear dos servicios:

* **getQuestions** : Traerá todas las preguntas que están almacenadas en la base de datos, para que éstas sean aleatorias se puede establecer la función rand() a la consulta.

````
select * from tabla order by rand();
```

El servicio deberá devolver un JSON que contenga las preguntas que se le mostrarán al usuario:

### Ejemplo

```json
[  
   {  
      "numpregunta":1,
      "pregunta":"¿Quien no es integrante de los The Beatles?",
      "opcion1":"Paul McCartney",
      "opcion2":"John Lennon",
      "opcion3":"Ringo Starr",
      "opcion4":"Izzy Stradlin"
   },
   {  
      "numpregunta":2,
      "pregunta":"¿Qué país no posee armas nucleares?",
      "opcion1":"India",
      "opcion2":"Francia",
      "opcion3":"España",
      "opcion4":"USA"
   }
]
```

* **isValid** : Servicio que validará si la respuesta dada por el usuario ha sido correcta, el servicio espera un objeto con el número de la pregunta y la respuesta dada por el usuario.
 
```javascript
var validaRespuesta = {numPregunta : numPregunta, respuesta : respuesta};
```

El servicio a su vez deberá regresar la respuesta correcta, en el caso que el usuario haya contestado mal y una variable que lo indique:

```javascript
var devuelve = {respuestaCorrecta : variableNumeroPreguntaCorrecta, correcto : false};
```

## Entregables.

* Se deberá versionar el código en GitHub, el cual se deberá evidenciar el archivo package.json, con las despendencias utilizadas.
* Se deberá desplegar el código en [Cloud9] y entregar la url de publicación con la actividad en funcionamiento.

## Ejemplo.

La actividad puede ser vista en funcionamiento en la siguiente dirección: https://trivia-jorger-1.c9.io

### Autor
Jorge Rubaino

[@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
[Trivia Crack]:http://www.triviacrack.com/
[Cloud9]:https://c9.io/
