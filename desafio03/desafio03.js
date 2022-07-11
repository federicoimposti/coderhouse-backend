const express = require('express');
const Contenedor = require('./contenedor');
const productos = new Contenedor('productos.txt');

const app = express();

const PORT = 8080;

app.get('/productos', (req, res) => {
    productos.getAll()
    .then(products => {
        res.send(products);
    })
    .catch(err => {
        console.log('ocurrió un error al obtener los productos.', err);
    })
})

app.get('/productoRandom', (req, res) => {
    productos.getAll()
    .then(products => {
        const randomProduct = products[Math.floor(Math.random()*products.length)];
        res.send(randomProduct);
    })
    .catch(err => {
        console.log('ocurrió un error al obtener los productos.', err);
    })
})
 

const server = app.listen(PORT, () => {
   console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
})

server.on("error", error => console.log(`Error en servidor ${error}`));