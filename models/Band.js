const mongoose = require("mongoose");

const BandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    style: { type: String, required: true },
    members: { type: Number, required: true },
    image: { type: String } // Guardamos el nombre de la imagen
});

module.exports = mongoose.model("Band", BandSchema);
