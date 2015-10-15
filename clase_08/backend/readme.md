# Servicios REST/Express

Servicio Rest To-Do List haciendo uso de Arrays para almacenamiento de Tareas.

### Instalación dependencias.

```
npm install
```

### Servicios

* Mostrar todas las tareas.
* Crear una nueva tarea.
* Editar/cambiar estado de una tarea.
* Mostrar sólo una tarea.
* Eliminar una tarea.

#### Mostrar todas las tareas.

Método **GET**

http://localhost:8081/getAllTask

#### Crear una nueva tarea.

Método **POST**

http://localhost:8081/createTask

```json
{
	"task"	    :	"Nueva Tarea",
	"finish"	: 	true
}
```

#### Editar/cambiar estado de una tarea.

Método **PUT**

http://localhost:8081/updateTask

```json
{
	"id"        :   1,
	"finish"	: 	false, 
	"field"     :   "finish"
}
```

#### Mostrar sólo una tarea.

Método **GET**

http://localhost:8081/getTask/**idTask**

#### Eliminar una tarea.

Método **DELETE**

http://localhost:8081/deleteTask/**idTask**


### Autor
Jorge Rubaino

[@ostjh]
License
----
MIT
[@ostjh]:https://twitter.com/ostjh
