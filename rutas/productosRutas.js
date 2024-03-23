const express = require('express');
const router = express.Router();
const productoController = require('../mongoConexion/mongoController');

// Ruta para crear un nuevo producto
router.post('/productos', async (req, res) => {
    try {
        const {producto_key, descripcion, precio, sku, impuestos, impuestos_locales } = req.body;
        const newProducto = await productoController.createProducto(producto_key, descripcion, precio, sku, impuestos, impuestos_locales);

        // Si la creación del producto fue exitosa, responder con el nuevo producto
        res.status(201).json(newProducto);
    } catch (error) {
        console.error("Error al insertar producto en la base de datos:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// Ruta para obtener todos los productos
//router.get('/productos', productoController.getProductos);
router.get('/productos', async (req, res) => {
    try {
        const productos = await productoController.getProductos();
        res.json(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
});

module.exports = router;
