const mongoose = require("mongoose");

const BandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("Band", BandSchema);
