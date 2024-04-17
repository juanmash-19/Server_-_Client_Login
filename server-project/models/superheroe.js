const mongoose = require("mongoose");

const SuperheroSchema = new mongoose.Schema({
    superheroe_name: {
        type: String,
        required: true,
    },
    superpowers: { 
        type: Array, 
        required: true,
    },
    isAlive: {
        type: Boolean,
        required: true,
    },
});

const Superhero = mongoose.model("Superhero", SuperheroSchema);
module.exports =    Superhero;