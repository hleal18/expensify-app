//Se usa express que permite crear servidores web.
//Se acciona desde el cmd. No usa webpack ni nada externo.
//Solo se acciona el servidor express.
const express = require('express');
//Se guarda lo que regresa express.
const app = express();

//Se le indica que debe ofrecer, será la carpeta public.
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');

//Puerto que se obtiene de heroku en caso de que se esté desplegando.
const port = process.env.PORT || 3000;

//Se le indica el middleware (algo que se ejecuta con cada petición).
app.use(express.static(publicPath));

//Se añade la misma configuración que se usó en el dev-server
//historyApiFallback. Cada vez que encuentre un 404 (una ruta no especificada)
//en el servidor, usará el index.html para ubicarla.
//Evita que se generen errores al actualizar páginas.
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
})

//Se configura la incialización del servidor.
//Recibe el puerto y un callback que se acciona cuando el servidor se
//conecta.
//El puerto se adapta para heroku que provee una dinámica.
app.listen(port, () => {
    console.log('Server is up');
});

//Se ejecuta un node script.
//node server/server/.js
//Es accesible desde localhost:3000