const fs = require('fs');

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

    async save(obj) {
        try {
            
            const products = await this.getAll();

            if (!products || !products.length) {
                obj.id = 1;
                await fs.promises.writeFile(this.file, JSON.stringify([obj], null, 2));

                return obj.id;
            }

            const lastProduct = products.slice(-1);
            obj.id = parseInt(lastProduct[0]?.id) + 1;
            
            const addProduct = [...products, obj];
            await fs.promises.writeFile(this.file, JSON.stringify(addProduct, null, 2));

            return obj.id;
        } catch (err) {
            throw new Error('Ocurrió un error al guardar el archivo.', err);
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
}
