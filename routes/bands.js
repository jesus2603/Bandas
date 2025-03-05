const express = require("express");
const multer = require("multer");
const Band = require("../models/Band");

const router = express.Router();

// Configurar multer para guardar imágenes
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Crear una banda
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newBand = new Band({
      name: req.body.name,
      genre: req.body.genre,
      image: `/uploads/${req.file.filename}`,
    });
    await newBand.save();
    res.status(201).json(newBand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todas las bandas
router.get("/", async (req, res) => {
  try {
    const bands = await Band.find();
    res.json(bands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Editar una banda
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      genre: req.body.genre,
    };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;
    
    const updatedBand = await Band.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedBand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar una banda
router.delete("/:id", async (req, res) => {
  try {
    await Band.findByIdAndDelete(req.params.id);
    res.json({ message: "Banda eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
