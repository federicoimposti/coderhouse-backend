const express = require('express');
const app = express();
const router = require('./routes');
const pug = require('pug')

const PORT = 8080;

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`));