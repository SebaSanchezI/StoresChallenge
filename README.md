# Challenge Stores

## ``APLIACACION TIENDAS.``

La idea de esta apliacion es mostrar distintas tiendas, las cuales tienen usuarios con distintos roles, _cajero_ o _supervisor_. Cada usuario tiene que logearse para poder para desempeñar sus tareas habituales. </br>La pagina inicial es el ``Login``. Cada usuario debera ingresar _Email o Nombre de Usuario_ y _Contraseña_. </br> Una vez logueado ingresa a la ``Home`` donde se encuentran las tiendas, cada una se muestra en un formato de Card.
Cada una tiene acceso a la lista de sus usuarios y a estadisticas sobre ellos, las mismas se muestran en graficos. </br> En el ``Header`` podemos encontar un menu con las opciones: _Administrar Usuarios y Home_ y un boton de _Logout_.</br> Administrar usuarios nos dirige a un ``CRUD`` (Create-Read-Update-Delete) de usuarios. La tabla muestra el _Nombre, Apellido, Usuario,Perfil, Tienda, Email y Contraseña_. La tabla da la posibiliad de hacer filtros por las caracteristicas antes nombradas (excepto la contraseña, la cual esta encryptada). 

## ```TECNOLOGIAS UTILIZDAS``` 🛠️


* [React](https://es.reactjs.org/) - El framework web usado
* [Redux](https://es.redux.js.org/) - Manejador de estados globales
* [Material UI](https://material-ui.com/) - Usado para darle estilos.
* [Node JS](https://nodejs.org/es/) - Usado para backend.
* [Express JS](https://www.express.com.ar/) - Usado generar la API.
* [Sequeliz](http://sequelize.org/) - Usado como ORM.
* [Postgres](https://www.postgresql.org/) - Usado como base de datos relacional.

## ```COMENZANDO``` 🚀


_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas._

</br> 

## Pre-requisitos 📋

* Es necesario contar minimamente con la última versión estable de Node y NPM.
Para verificar que versión tienen instalada:
```
node -v 
npm -v
```
* Tener instalado el administrador de Base de Datos ``Postgres SQL``

</br> 

##  Instrucciones 🔧

</br> 

> _1 - Clonar repositorio_

</br> 

* Desde la consola de comandos, ubicarse en la carpeta en la cual se clonara el repositrio y luego ejecutar el comando ``git clone`` mas la url.


```
User/Folder git clone https://github.com/SebaSanchezI/ProyectoNCR
```
</br>

> _2 - Abrir editor de codigo preferrido_

* En la ruta principal aparecen dos carpetas ``api`` y  ``client``.

</br> 


> _3 - Instalar las Dependencias_
</br> 

* Desde la consola de comandos ubicarse en la carpeta __api__, ejecutar el siguiente comando: 

```
npm install
```

* Posteriormente ubicarse en la carpeta __client__ y ejecutar el mismo comando.

</br>

> _4 - Crear la Base De Datos_
</br> 

* Ingresar en una nueva ventana de la terminal de comandos. Ejecutar el siguiente comando:

``` 
psql -U postgres 
```

* Ingresar la contraseña agregada en la instalacion de _Postgres_.

* Crear una Base de Datos nueva con el nombre ``ncr``. Ingresar el siguiente comando:

```
CREATE DATABASE ncr;
```
* No salir de esta linea de comandos porque posteriormente se utilizara para cargar datos.

</br>

> _4 - Crear archivo .env_
</br>

* Ubicado en la carpeta _api_ crear un archivo con el nombre ``.env``
* Ingresar los siguientes datos:

```
# DB config

DB_USER= 'postgres'
DB_PASSWORD = 'tuContraseñaPostgres'
DB_HOST = 'localhost'
DB_PORT = '5432'
DB_NAME = 'ncr'

# Auth Config

AUTH_SECRET = 'secretncr'
AUTH_EXPIRES = 1D
AUTH_ROUNDS = 10

# HOST
FRONTEND_URL= 'http://localhost:3000'
```
</br>

> _5 - Inciar la Apliacion_
</br>

* Desde la terminal de comandos ubicarse en la carpeta _api_ y ejecutar el siguiente comando:

```
npm start
```
* Repetir el mismo proceso ubicado en la carpeta _client_

</br>

> _6 - Poblar Base de Datos_
</br>

* Dentro de la carpeta _api_ se encuentra una carpeta llamada _``sql``_, en esta ultima hay un archivo ``database.sql``. 
* Copiar las lineas correspondientes a las _tiendas_.
* Pegar estas lineas en la terminal donde se creo la Base de Datos. Luego Presionar Enter.
* Repetir el proceso con los datos de los _usuarios_.

</br>

> _7 - Loguearse_
</br>

* En la aplicacion ingresar las siguientes `credenciales`:
```
username: ssanchez
password: 123456
```
</br>

## ```DOCUMENTACION API``` ✒️
Esta documentacion se realizo enteramente con [Swagger](https://swagger.io/). En la misma se encuentran los *endpoints* que se utilizaron para acceder a los datos del Backend. Cada uno de ellos brinda un servicio distinto, los cuales pueden ser probados ingresando los datos solicitados.  Para poder ingresar a la documentacion y hacer uso de ella debe seguir los siguientes pasos:</br>

1. Levantar el servidor: desde la consola, ubicado en la carpeta de proyecto, moverse a la carpeta _api_ y ejecutar el comando _``npm start``_. 

2. Ingresar en el navegador a la ruta ``http://localhost:3001/api-docs``. Para un acceso mas rapido puede hacer clic en este [link](http://localhost:3001/api-docs/).
3. Los _Endpoint_ estan protegidos con un Token de seguridad. Para poder acceder a este debe loguearse. Para ello debe ingresar en el _Endpoint_ de login (POST). Precionar el boton de _``Try it out``_. Con las credencialies existentes precionar el boton _``Execute``_. Esta accion arroja una respuesta 200 con los datos de un usuario y su token de autenticacion.
4. Seleccionar y copiar el _``Token de autenticacion``_. En la parte superior derecha de la documentacion aparece el boton de _``Authorize``_  🔒 , hacer clic en él  y pegar el token en el campo _value_. Ahora podra ingresar al resto de los _Endpoints_. 



