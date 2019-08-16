const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId; // Generar string aleatorio

const vehiculoSchema = new Schema({
    vehiculoId: ObjectId,
    nombre: String,
    year: Number,
    kilometraje: Number,
    description: String,
    ultServicio: String,
    image: [String]
});

const Vehiculo = mongoose.model('Vehiculo', vehiculoSchema);

module.exports = { Vehiculo }
