const express = require("express");
const ProductManager = require('./productManager.js');

const app = express();
const productManager = new ProductManager();

app.get("/products", async(req, res) => {
    const limit = parseInt(req.query.limit) || 10; // Establecemos un límite predeterminado de 10
    const productos = await productManager.consultarProductos(limit); // Agregamos el parámetro de límite a la función consultarProductos
    const products2 = JSON.stringify(productos)
    res.send("¡Bienvenido a la página principal! "+products2);
});

app.get("/products/:id", async (req, res) => {
    const idProducto = req.params.id;
    console.log(`Recibida solicitud para producto con ID ${idProducto}`);
    const producto = await productManager.getProductElementById(parseInt(idProducto));
    const producto2 = JSON.stringify(producto)
    if(producto2==="null"){
        res.send("Producto no encontrado, ID erroneo");
    }else{
        res.send("Recibida solicitud para producto con ID "+producto2);
    }  
});

app.listen(8080, () => {
    console.log("Servidor arriba en el puerto 8080");
});
