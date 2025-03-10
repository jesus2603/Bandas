const express = require("express");
const multer = require("multer");
const path = require("path");
const Band = require("../models/Band");

const router = express.Router();

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Listar bandas
router.get("/", async (req, res) => {
    const bands = await Band.find();
    res.render("index", { bands });
});

// Formulario para nueva banda
router.get("/new", (req, res) => {
    res.render("new");
});

// Crear nueva banda
router.post("/", upload.single("image"), async (req, res) => {
    const { name, style, members } = req.body;
    const image = req.file ? req.file.filename : "";

    const newBand = new Band({ name, style, members, image });
    await newBand.save();
    res.redirect("/bands");
});

// Formulario de edición
router.get("/edit/:id", async (req, res) => {
    const band = await Band.findById(req.params.id);
    res.render("edit", { band });
});

// Editar banda
router.put("/:id", upload.single("image"), async (req, res) => {
    const { name, style, members } = req.body;
    const band = await Band.findById(req.params.id);

    if (req.file) band.image = req.file.filename;
    band.name = name;
    band.style = style;
    band.members = members;

    await band.save();
    res.redirect("/bands");
});

// Eliminar banda
router.delete("/:id", async (req, res) => {
    await Band.findByIdAndDelete(req.params.id);
    res.redirect("/bands");
});

module.exports = router;
