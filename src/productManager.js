const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = "./src/files/products.json";
    }

    consultarProductos = async (limit = null) => { // Agregamos el parámetro limit con valor predeterminado de null
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8");
                const result = JSON.parse(data);
                if (limit) { // Si se proporciona el parámetro de límite, devolvemos solo la cantidad especificada
                    return result.slice(0, limit);
                } else { // Si no se proporciona el parámetro de límite, devolvemos todos los productos
                    return result;
                }
            } else {
                return [];
            }
        } catch (err) {
            console.log(`error: ${err}`);
        }
    };

    getProductElementById = async (id) => {
        const products = await this.consultarProductos();

        try {
            const product = products.find(element => element.id === id);
            console.log(product);
            return product ? product : null;
        } catch (err) {
            console.log(`error: ${err}`);
        }

    };
}

module.exports = ProductManager;
