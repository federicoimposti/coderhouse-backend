const fs = require('fs');

module.exports = class Contenedor {
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

    async getById(id) {
        try {
            const products = await this.getAll();

            if (!products) {
                return null;
            }

            const product = products.find(product => product.id === id);
            return product ? product : null;
        } catch (err) {
            throw new Error('Ocrrió un error obteniendo el producto.', err);
        }
    }

    async getAll() {
        try {
            const products = await fs.promises.readFile(this.file, 'utf-8');
            return products ? JSON.parse(products) : null;
        } catch(err) {
            throw new Error('Ocurrió un error obteniendo los productos.', err);
        }
    }

    async deleteById(id) {
        try {
            const products = await this.getAll();

            if (!products) {
                return;
            }

            const productsFiltered = products.filter(product => product.id !== id);
            await fs.promises.writeFile(this.file, JSON.stringify(productsFiltered, null, 2));
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
