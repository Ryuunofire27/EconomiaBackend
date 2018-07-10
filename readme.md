# Sistema Encuesta API

Bienvenido al sistema encuesta API. Esta api provee el acceso a los servicios del sistema encuesta.

# Group Usuarios


## Usuario [/usuarios/{?search}{&limit}{&page}{&type}{id}]
+ Model (application/json)

    ```js
    {
      /*Solo en GET*/
      "id_usuario": Number,
      /*||||||||||*/
      "codigo": String,
      /*Solo en GET*/
      "contrasenia": String,
      /*||||||||||*/
      "nombres": String,
      "apellidos": String,
      "telefono": String,
      "celular": String,
      "numero_doc": String,
      "email": String,
      "genero": String,
      /*Solo en post o put*/
      "foto": File,
      /*|||||||*/
      /*Solo en get*/
      "foto": String,
      /*|||||||*/
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
    + type (enum[number], optional) - El tipo de perfil de los usuarios que se devolveran (1 - Encuestadores, 2 - Investigadores)
        + Members
            + 1 
            + 2 

+ Response 200 (application/json)
    [Usuario][]

### Obtener un Usuario [GET]

Obtiene el usuario con el id

+ Parameters
    + id: (Number) - el id del usuario

+ Response 200 (application/json)
    [Usuario][]

### Obtener encuestas hechas por el investifador [GET /usuarios/{id}/encuestas/{?limit}{&page}]

Obtiene un arreglo de Encuestas creadas por el usuario.

+ Parameters
    + id: (Number) - el id del usuario

    + limit (number, optional) - El limite de usuarios que regresa el metodo
        + Default: 10

    + page (number, optional) - La pagina desde donde se empieza la extraccion de usuarios
        + Default: 1

+ Response 200 (application/json)
    + Body
        {
            "id_encuesta": Number,
            "tema_encuesta": String,
            "tiempo_habil": String,
            "fecha_creacion": Date,
            "fecha_inicio": Date,
            "fecha_termino": Date
        }

### Crear Usuario [POST]

Crea un nuevo usuario ( Encuestador o Investigador )

+ Request
    [Usuario][]

+ Response 200
    [Usuario][]

### Login Usuario [POST /usuarios/login]

Loggea un usuario ( Encuestador o Investigador )

+ Request
    + Body 
        {
          "email": String,
          "password": String
        }

+ Response 200
    [Usuario][]

### Cambiar Contraseña [POST /usuarios/{id}/changePassword]

Cambia la contraseña de un usuario ( Encuestador o Investigador )

+ Parameters
    + id: (number)

+ Request
    + Body 
        {
          "oldpassword": String,
          "password": String,
          "repassword": String
        }

+ Response 200
    [Usuario][]

### Resetear Contraseña [POST /usuarios/{id}/resetPassword]

Resetea la contraseña de un usuario ( Encuestador o Investigador ) y se la envia a su correo

+ Parameters
    + id: (number)

+ Request
    + Body 
        {
            "email": String
        }

+ Response 200
    {
        "msg": "Contraseña generada con exito"
    }

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

## Encuesta [/encuestas/{?limit}{&page}{id}]

+ Model
    ```js
    {
      /*Solo en GET*/
      "id_encuesta": Number,
      /*||||||||||*/
      "tema_encuesta": String,
      "tiempo_habil": String,
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
    + Body
        {
            "id_encuesta": Number,
            "tema_encuesta": String,
            "tiempo_habil": String,
            "fecha_creacion": Date,
            "fecha_inicio": Date,
            "fecha_termino": Date
        }

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

# Group Tipo Documentos

## TipoDocumento [/tipodocumentos/{id}]

+ Model
    ```js
    {
      /*Solo en GET*/
      /* LLave Primaria */
      "id_tipo_documento": Number,
      /* Atributos extras */
      "nombre_documento": String,
      "descrip_documento": String
    }
    ```

### Obtener todos los tipos de documentos [GET]

Obtiene todos los tipos de documentos que existen en el Sistema.

+ Response 200 (application/json) 
    [TipoDocumento][]

### Crear un nuevo tipo de documento [POST]

Crea una nuevo tipo de documento

+ Response 201 (application/json)
    [TipoDocumento][]

### Elimina un tipo de documento [DELETE]

Se elimina el tipo de documento seleccionado.

+ Parameters
    + id: (Number)

+ Response 200 (application/json)
    + Body
        {
          "msg": "Tipo de documento eliminado correctamente"
        }

# Group Sectores

## Sector [/sectores/{id}]

+ Model
    ```js
    {
      /*Llave primaria*/
      "id_sector": Number,
      /*Atributos extras*/
      "nombre_sector": String,
      "descripcion_sector": String
    }
    ```

### Obtener todos los Sectores [GET]

Obtiene todos los sectores que existen.

+ Response 200 (application/json) 
    [Sector][]

### Crear un nuevo Sector [POST]

Crea un nuevo sector

+ Response 201 (application/json)
    [Sector][]

### Elimina un Sector [DELETE]

Se elimina el sector seleccionado

+ Parameters
    + id: (Number)

+ Response 200 (application/json)
    + Body
        {
          "msg": "Sector eliminado correctamente"
        }

# Group TipoEmpresas

## Tipo_empresa [/tipoempresas/{id}]

+ Model
    ```js
    {
      /*Llave primaria*/
      "id_tipo_empresa": Number,
      /*Atributos extras*/
      "tipo_empresa": String
    }
    ```

### Obtener todos los tipos de empresas [GET]

Obtiene todos los tipos de empresas que existen.

+ Response 200 (application/json) 
    [Tipo_empresa][]

### Crear un nuevo tipo de empresa [POST]

Crea un nuevo tipo de empresa

+ Response 201 (application/json)
    [Tipo_empresa][]

### Elimina un tipo de empresa [DELETE]

Se elimina el tipo de empresa seleccionado

+ Parameters
    + id: (Number)

+ Response 200 (application/json)
    + Body
        {
          "msg": "Tipo de empresa eliminado correctamente"
        }


# Group Encuestados

## Encuestado [/encuestados/{id}]

+ Model
    ```js
    {
      /*Llave primaria*/
      "id_encuestado": Number,
      /*Atributos extras*/
      "ruc": String,
      "razon_social": String,
      "representante": String
    }
    ```

### Obtener todos los encuestados [GET]

Obtiene todos los encuestados que existen.

+ Response 200 (application/json) 
    [Encuestado][]

### Crear un nuevo encuestado [POST]

Crea un nuevo encuestado

+ Response 201 (application/json)
    [Encuestado][]

### Elimina un encuestado [DELETE]

Se elimina el encuestado seleccionado

+ Parameters
    + id: (Number)

+ Response 200 (application/json)
    + Body
        {
          "msg": "Encuestado eliminado correctamente"
        }