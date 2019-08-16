const express = require("express");
const path = require('path');
const router = express.Router();
const { Vehiculo } = require("../models/vehiculo");

router.get("/", (req, res, next) => {
    res.status(200).sendFile(path.resolve("src/views/index.html"));
});

// CREATE
router.post("/api/v1/vehiculo", (req, res, next) => {
    const { nombre, year, kilometraje, description, ultServicio, image } = req.body;
    const newVehiculo = Vehiculo({
        nombre,
        year,
        kilometraje,
        description,
        ultServicio,
        image
    });
    newVehiculo.save((err, vehiculo) => {
        err ? res.status(409).send(err.message) : res.status(201).send(vehiculo)
    });
});

// READ
router.get("/api/v1/vehiculo", (req, res, next) => {
    Vehiculo.find().exec()
        .then(vehiculos => res.status(200).send(vehiculos))
        .catch(err => res.status(404).send(err));
});

router.get("/api/v1/vehiculoById/", (req, res, next) => {
    const { id } = req.query;
    Vehiculo.findById(id).exec()
        .then(vehiculos => res.status(200).send(vehiculos))
        .catch(err => res.status(404).send(err));
});

router.get("/api/v1/busqueda/vehiculo", (req, res, next) => {
    const { q } = req.query;
    Vehiculo.find({ title: q }).exec()
        .then(vehiculo => {
            vehiculo.length > 0
                ? res.status(200).send(vehiculo)
                : res.status(404).send("Not found")
        })
        .catch(err => res.status(404).send(err))
});

// UPDATE

// Modificar todo el objeto o registro
router.put("/api/v1/vehiculo/update", (req, res, next) => {
    const { id } = req.query;
    const body = req.body;

    Vehiculo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(newVehiculo => {
            if (newVehiculo !== null) {
                res.status(202).send(newVehiculo)
            } else {
                res.status(304).send("Registro no encontrado, imposible modificar")
            }
        })
        .catch(err => res.status(404).send(err))
});

// Modificar parcialmente el registro
router.patch("/api/v1/vehiculo/update", (req, res, next) => {
    const { id } = req.query;
    const body = req.body;

    Vehiculo.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(newVehiculo => {
            if (newVehiculo !== null) {
                res.status(202).send(newVehiculo)
            } else {
                res.status(304).send("Registro no encontrado, imposible modificar")
            }
        })
        .catch(err => res.status(404).send(err))
});

// DELETE
router.delete("/api/v1/vehiculo/delete", (req, res, next) => {
    const { id } = req.query;

    Vehiculo.findByIdAndRemove(id).exec()
        .then(vehiculo => {
            vehiculo !== null
                ? res.status(200).send({ mensaje: "Vehiculo borrado exitosamente", body: vehiculo })
                : res.status(304).send({ mensaje: "Registro no eliminado " })
        })
        .catch(err => res.status(304).send({ mensaje: "Registro no eliminado " }))
});

module.exports = { router };
