
# Pixcrate Snap
## Current LTS: **_Alpha 2_**

## ¿Qué es Pixcrate?
Pixcrate pretende ser una red social para compartir imágenes con nuestros seguidores, haciendo hincapié en la usabilidad y un *feel* más humano, tanto en sus interfaces de usuario como en la interacción social dentro de la app.

Está desarrollada con **Ionic 4** para el front y **NodeJS**, **Express**, **MongoDB** y **AWS S3** en el backend (conocido como **MEAN** stack)

## Guia de uso básica

1. Lanzamos la aplicación. Nos llevará a la pantalla de _**Login**_, donde introduciremos nuestras credenciales si es que disponemos de las mismas. 

2. Si no es así, entonces clicaremos en el link de _**Registro**_, y rellenaremos los campos necesarios para completar el registro.

3. Una vez estemos registrados volveremos a la pantalla de Login, donde introduciremos las credenciales correctas. Esto nos asignará una llave especial llamada JWT, o Json Web Token. Con esta llave, (aun siendo irrelevante para el usuario medio), la API de Pixcrate nos autorizará en cada acción que ejecutemos, o nos denegará el permiso si estamos intentando engañar al servidor.

4. Una vez en el panel de _**Feed**_ :house:, veremos que no tenemos ninguna imagen, por lo que nos dirigiremos a el apartado _**Upload**_ :heavy_plus_sign:, y pulsaremos el botón para seleccionar una imagen. Una vez seleccionemos nuestra imagen de la galería, comenzará la subida. (OJO!! SOLO SE ACEPTA **MIME TYPE JPEG**. Una subida de archivo con otro formato resultará en un mensaje de error)

5. Ahora podemos volver al Feed y tocar el botón con los tres puntos en vertical de cualquiera de nuestras publicaciones, mostrando un menú contextual con las opciones **EDIT**, **DELETE** y **CLOSE**.

- EDIT: Podremos editar la descripción de nuestra publicación. Una vez escrita sólo hemos de pulsar **_ENTER_**
- DELETE: Una vez pulsado este botón, se eliminará la imagen o publicación de la vista y de la base de datos. **No aparecerá más en nuestra lista**
- CLOSE: Se cierra el menu contextual.

6. Alternativamente, si queremos podemos cerrar sesión, pulsando el botón inferior **_Settings_** :gear: -> Log out -> Pulsamos 'Yes' en el diálogo de confirmación. De lo contrario, el token tiene 24 horas de uso antes de su expiración.

* SI NUESTRO TOKEN EXPIRA PASADAS LAS 24h PODREMOS RENOVARLO LOGUEANDONOS DE NUEVO.

-----------------------------------------------------------------------------------------------------------------------------------

Éste es el aspecto de la misma (versión actual):

<h2>Login y Registro</h2>
<div>
  <img src="https://github.com/almAngel/ion-pixcrate/blob/master/imagenes/login.png" alt="login-page" width="250"/>
  <img src="https://github.com/almAngel/ion-pixcrate/blob/master/imagenes/register.png" alt="register-page" width="250"/>
</div>
<h2>Dentro de la app</h2>
<div>
  *NUEVO!!*
  <img src="https://github.com/almAngel/ion-pixcrate/blob/master/imagenes/pixcrate_camera.jpg" alt="camera-option" width="250"/>
  
  <img src="https://github.com/almAngel/ion-pixcrate/blob/master/imagenes/feed.png" alt="feed-page" width="250"/>
  <img src="https://github.com/almAngel/ion-pixcrate/blob/master/imagenes/upload.png" alt="upload-page" width="250"/>
  <img src="https://github.com/almAngel/ion-pixcrate/blob/master/imagenes/settings.png" alt="settings-page" width="250"/>
  <img src="https://github.com/almAngel/ion-pixcrate/blob/master/imagenes/contextual_menu.png" alt="cm-feed-page" width="250"/>
  <img src="https://github.com/almAngel/ion-pixcrate/blob/master/imagenes/logout_alert.png" alt="al-settings-page" width="250"/>
</div>

## Detalles de desarrollo (Alpha 2)

- Framework propio creado desde cero para desarrollo de APIs basadas en **MEAN** stack. (Notificar para ver repositorio)

- Incorpora un sistema de autenticación con **_JWT_**, que se encargará de las sesiones y de verificar que sólo tú puedas manipular tus imágenes, además de contar con encriptado **_hash+salt_** para tu contraseña.

- Incorpora la funcionalidad de la cámara para que el usuario pueda hacer fotos y subirlas al instante.

- Se requieren permisos de geolocalización y cámara para el correcto funcionamiento de la aplicación.

- Se recogen datos de usuario, como última localización e información del dispositivo.

DIAGRAMA DE BASE DE DATOS (NO RELACIONAL):

<img src="https://github.com/almAngel/ion-pixcrate/blob/master/imagenes/Mongo.png" alt="mongo-diag" width="400"/>

## Guia de uso en video

[![VIDEOGUIA](http://i3.ytimg.com/vi/4oswZ0sX7V8/maxresdefault.jpg)](https://youtu.be/4oswZ0sX7V8)

## Utilidades

### Ususario de ejemplo:
<p>email: example@example.com</p>
<p>pass: Example123</p>
