require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Configurar Express para recibir JSON
app.use(express.json());

// Usar variables del .env
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Conectar a MongoDB
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Conectado a MongoDB'))
    .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Ruta principal para evitar "Cannot GET /"
app.get('/', (req, res) => {
    res.send('<h1>¡Bienvenido a la API de Bandas!</h1>');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
