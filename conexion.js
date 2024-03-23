const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://guzmancitojorge17:ZU0x4wT3ajEYlgKs@cluster0.lwiovtr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function obtenerIdImpuestosClientes() {
    try {
        await client.connect(); // Conectar a la base de datos
        const db = client.db('Clientes'); // Seleccionar la base de datos
        const collection = db.collection('Clientes'); // Seleccionar la colección

        // Proyección para obtener solo el campo id_impuestos
        const projection = {
            _id: 0, // Excluir el campo _id
            id_impuestos: 1 // Incluir el campo id_impuestos
        };

        // Obtener todos los documentos de la colección con solo el campo id_impuestos
        const clientes = await collection.find({}, projection).toArray();
        return clientes.map(cliente => cliente.id_impuestos);
    } catch (error) {
        console.error('Error al obtener los id_impuestos de los clientes:', error);
        throw error;
    } finally {
        await client.close(); // Cerrar la conexión a la base de datos
    }
}



obtenerIdImpuestosClientes();