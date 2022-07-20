const fs = require('fs');
const { title } = require('process');

let products = [{
    "title": "Escuadra",
    "price": 345.23,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    "id": 1
  },
  {
    "title": "Calculadora",
    "price": 234.56,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    "id": 2
  },
  {
    "title": "Globo Terráqueo",
    "price": 345.67,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    "id": 3
  }];

module.exports = class Controller {
    constructor(file) {
        this.file = file;
    }

    static save(obj) {
        try {
            if (!products || !products.length) {
                obj.id = 1;
                products.push(obj);
                return obj;
            }

            const lastProduct = products.slice(-1);
            obj.id = parseInt(lastProduct[0]?.id) + 1;
            
            const addProductToArray = [...products, obj];
            products = addProductToArray;

            return obj;
        } catch (err) {
            throw new Error('Ocurrió un error al guardar el producto.', err);
        }
    }

    static getById(id) {
        try {
            if (!products) {
                return null;
            }

            const product = products.find(product => product.id === id);
            return product ? product : null;
        } catch (err) {
            throw new Error('Ocrrió un error obteniendo el producto.', err);
        }
    }

    static getAll() {
        try {
            return products;
        } catch(err) {
            throw new Error('Ocurrió un error obteniendo los productos.', err);
        }
    }

    static deleteById(id) {
        try {
            if (!products) {
                return;
            }

            const productsFiltered = products.filter(product => product.id !== id);
            products = productsFiltered;
            return productsFiltered;
        } catch (err) {
            throw new Error('Ocurrió un error eliminando el producto.', err);
        }
        
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify([], null, 2));
        } catch (err) {
            throw new Error ('Ocurrió un error eliminando los productos.', err);
        }
        
    }

    static update(id, newData) {
        try {
            const { title, price, thumbnail } = newData;
            const productId = id;

            products.forEach(product => {
                const id = product.id;
                if(productId === id){
                    product.title = title;
                    product.price = price;
                    product.thumbnail = thumbnail;
                }
            })
        } catch (err) {
            throw new Error ('Ocurrió un error actualizando el producto.', err);
        }
      };
}
