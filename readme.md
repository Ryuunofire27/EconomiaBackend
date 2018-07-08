# Sistema Encuesta API

Bienvenido al sistema encuesta API. Esta api provee el acceso a los servicios del sistema encuesta.

# Group Usuarios


## Usuario [/usuarios/{?search}{?limit}{?page}{?type}{id}]
+ Model (application/json)

    ```js
    {
      /*Solo en GET*/
      "id_usuario": Number,
      /*||||||||||*/
      "codigo": String,
      "contrasenia": String,
      "nombres": String,
      "apellidos": String,
      "telefono": String,
      "celular": String,
      "numero_doc": String,
      "email": String,
      "genero": String,
      "foto": String,
      "status": Number,
      "id_perfil": Number,
      /* Si es investigador*/
      "id_tipo_doc": Number,
      "id_pais": Number,
      "universidad": String
      /*|||||||||||*/
    }
    ```

### Obtener todos los Usuarios [GET]

Obtiene un arreglo de usuarios

  + Parameters
      + search (string, optional) - El nombre, apellido o codigo de la persona a la que se busca
      + limit (number, optional) - El limite de usuarios que regresa el metodo
          + Default: 10
      + page (number, optional) - La pagina desde donde se empieza la extraccion de usuarios
          + Default: 1
      + type (number, optional) - El tipo de perfil de los usuarios que se devolveran

+ Response 200 (application/json)
    [Usuario][]

### Obtener un Usuario [GET]

Obtiene el usuario con el id

+ Parameters
  + id: (Number) - el id del usuario

+ Response 200 (application/json)
    [Usuario][]

### Crear Usuario [POST]

Crea un nuevo usuario ( Encuestador o Investigador )

+ Request
    [Usuario][]

+ Response 200
    [Usuario][]

### Login Usuario [POST]

Loggea un usuario ( Encuestador o Investigador )

+ Request
    + Body 
        {
          "email": String,
          "password": String
        }

+ Response 200
    [Usuario][]

### Eliminar Usuario [DELETE]

Se elimina el usuario

+ Parameters
    + id: (Number)

+ Response 200 (application/json)
    + Body
        {
          "msg": "Eliminado Correctamente"
        }

# Group Perfiles

## Perfil [/perfiles/{id}]

+ Model
    ```js
    {
      /*Solo en GET*/
      "id_perfil": Number,
      /*||||||||||||*/
      "nombre_perfil": String,
      "descripcion": String
    }
    ```

### Obtener todos los Perfiles [GET]

Obtiene todos los perfiles que existen.

+ Response 200 (application/json) 
    [Perfil][]

### Crear un nuevo Perfil [POST]

Crea un nuevo perfil

+ Response 201 (application/json)
    [Perfil][]

### Elimina un Perfil [DELETE]

Se elimina el perfil

+ Parameters
    + id: (Number)

+ Response 200 (application/json)
    + Body
        {
          "msg": "Eliminado Correctamente"
        }

# Group Paises

## Pais [/paises/{id}]

+ Model
    ```js
    {
      /*Solo en GET*/
      "id_pais": Number,
      /*|||||||||||*/
      "nombre_pais": String
    }
    ```

### Obtener todos los Paises [GET]

Obtiene todos los perfiles que existen.

+ Response 200 (application/json) 
    [Pais][]

### Crear un nuevo Pais [POST]

Crea un nuevo pais

+ Response 201 (application/json)
    [Pais][]

### Elimina un Pais [DELETE]

Se elimina el pais

+ Parameters
    + id: (Number)

+ Response 200 (application/json)
    + Body
        {
          "msg": "Eliminado Correctamente"
        }

# Group Zonas

## Zona [/zonas/{id}]

+ Model
    ```js
    {
      /*Solo en GET*/
      "cod_zona": Number,
      /*||||||||*/
      "ciudad": String,
      "estado_provincia": String,
      "id_pais": Number
    }
    ```

### Obtener todas las Zonas [GET]

Obtiene todas las zonas que existen.

+ Response 200 (application/json) 
    [Zona][]

### Crear una nueva Zona [POST]

Crea una nueva zona

+ Response 201 (application/json)
    [Zona][]

### Elimina una Zona [DELETE]

Se elimina la zona

+ Parameters
    + id: (Number)

+ Response 200 (application/json)
    + Body
        {
          "msg": "Eliminado Correctamente"
        }

# Group Encuestas

## Encuesta [/encuestas/{?limit}{?page}{id}]

+ Model
    ```js
    {
      /*Solo en GET*/
      "id_encuesta": Number,
      /*||||||||||*/
      "tema_encuesta": String,
      "tiempo_habil": Date,
      "fecha_creacion": Date,
      "fecha_inicio": Date,
      "fecha_termino": Date,
      "segmentos": [
        {
          /*Solo en GET*/
          "id_segmento": Number,
          /*||||||||||*/
          "tema_segmento": String,
          "preguntas": [
            {
              /*Solo en GET*/
              "id_pregunta": Number,
              /*||||||||||||*/
              "nmr_pregunta": Number,
              "pregunta": String,
              "alternativas": [
                {
                /*Solo en GET*/
                "id_alternativa": Number,
                /*|||||||||||||*/
                "alternativa": String
                }
              ]
            }
          ]
        }
      ]
    }
    ```

### Obtener todas las Encuestas [GET]

Obtiene un arreglo de Encuestas paginado.

+ + Parameters
      + limit (number, optional) - El limite de usuarios que regresa el metodo
          + Default: 10
      + page (number, optional) - La pagina desde donde se empieza la extraccion de usuarios
          + Default: 1

+ Response 200 (application/json) 
    [Encuesta][]

### Obtener una Encuesta [GET]

Obtiene la encuesta con el id

+ Parameters
  + id: (Number) - el id del usuario

+ Response 200 (application/json)
    [Encuesta][]

### Crear una nueva Encuesta [POST]

Crea una nueva Encuesta

+ Response 201 (application/json)
    [Encuesta][]

### Elimina una Encuesta [DELETE]

Se elimina la encuesta

+ Parameters
    + id: (Number)

+ Response 200 (application/json)
    + Body
        {
          "msg": "Eliminado Correctamente"
        }