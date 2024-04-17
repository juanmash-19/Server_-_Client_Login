const SuperheroModel = require("../models/superheroe")

const createSuperhero = async (req, res) => {
    try {
        const { superheroe_name, superpowers, isAlive } = req.body;
        const newSuperhero = new SuperheroModel({
            superheroe_name,
            superpowers,
            isAlive,
        });
        console.log(newSuperhero);
        // Enviamos el superhero a la base de datos 
        const superheroSaved = await newSuperhero.save();
        res.status(201).json(superheroSaved); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }  
};

const getListSuperhero = async (req, res) => {
    try{
        console.log("Listar Superheroes");
        const superheroes = await SuperheroModel.find();
        res.status(200).json(superheroes);
    }catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
};

const getSuperheroById = async (req, res) => {
    try{
        const { id } = req.params;
        const superhero = await SuperheroModel.findById(id);
        console.log(`Buscar superhero por id: ${id}`);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const editSuperhero = async (req, res) => {
    try{
        const { id } = req.params;
        const { superhero_name, superpowers, isAlive } = req.body;
        // findByIdAndUpdate recibe 3 parametros: el id del usuario o editar,
        // los datos a editar y un objetivo con la propiedad new: true
        const Superhero = await SuperheroModel.findByIdAndUpdate(
            id,
            {superhero_name, superpowers, isAlive},
            {new: true}
        );
        console.log(Superhero);
        res.status(200).json(Superhero);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteSuperhero = async (req, res) => {
    try{
        const { id } = req.params;
        await SuperheroModel.findByIdAndDelete(id);
        console.log("Superhero deleted");
        res.status(200).json({message: "Superhero deleted"});
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createSuperhero, getListSuperhero, getSuperheroById, editSuperhero, deleteSuperhero};