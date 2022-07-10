const Contenedor = require('./contenedor');
const productos = new Contenedor('productos.txt');

const productoPrueba = {
    title: "Escuadra",
    price: 345.23,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
}

productos.save(productoPrueba)
    .then(productoId => {
        console.log('productId saved -> ', productoId);
    })
    .catch(err => {
        console.log(err)
    })

productos.getAll()
    .then(products => {
        console.log('getAll method call -> ', products);
    })
    .catch(err => {
        console.log(err);
    })

productos.getById(6)
    .then(producto => {
        if(producto){
            console.log(`Obtengo el producto con el id ${producto.id}`, producto);
        } else {
            console.error('No existe ningún producto con el id indicado.');
        }
    })
    .catch(err => {
        console.log(err);
    })

// productos.deleteById(3); Remove comment to test method

// productos.deleteAll(); Remove comment to test method