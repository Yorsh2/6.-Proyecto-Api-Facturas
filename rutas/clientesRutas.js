const express = require('express');
const router = express.Router();
const mongoConexion = require('../mongoConexion/mongoController');


//1. Agregar nuevo cliente
router.post('/clientes', async (req, res) => {
    try {
        const { nombre_legal, id_impuestos, sistema_impuestos, email, codigoPostal, calle, colonia, numero, direccion } = req.body;
        const newCliente = await mongoConexion.createCliente(nombre_legal, id_impuestos, sistema_impuestos, email, codigoPostal, calle, colonia, numero, direccion);

        // Si la creación del cliente fue exitosa, responder con el nuevo cliente
        res.status(201).json(newCliente);
    } catch (error) {
        if (error.message === "Regimen fiscal inexistente") {
            console.error("Error: Regimen fiscal inexistente");
            res.status(400).json({ error: "Regimen fiscal inexistente" });
        } else if (error.message === "Código postal inválido") {
            console.error("Error: Código postal inválido");
            res.status(400).json({ error: "Código postal inválido" });
        } else {
            console.error("Error al insertar cliente en la base de datos:", error.message);
            res.status(500).json({ error: error.message });
        }
    }
});

router.get('/clientes', async (req, res) => {
  try {
      const clientes = await mongoConexion.getClientes();
      res.json(clientes);
  } catch (error) {
      console.error("Error al obtener clientes:", error);
      res.status(500).json({ error: "Error al obtener clientes" });
  }
});

module.exports = router;

