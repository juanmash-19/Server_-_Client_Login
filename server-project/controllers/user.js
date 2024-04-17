const UserModel = require("../models/user");

const createUser = async (req, res) => {
    try {
        const { user_name, last_name, email, password, active_status, role } = req.body;
        const avatar = req.file ? req.file.filename : null;
        console.log(avatar);
        const user = new UserModel({
            user_name,
            last_name,
            email,
            password,
            active_status,
            role,
            avatar
        });
        const newUser= await user.save();
        res.status(201).json(newUser);
    } catch (error) {
    res.status(400).json({ message: error.message });
    }
};

const getListUsers = async (req, res) => {
    try{
        console.log("Listar usuarios");
        const users = await UserModel.find();
        res.status(200).json(users);
    }catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await UserModel.findById(id);
        console.log(`Buscar usuario por id: ${id}`);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const editUser = async (req, res) => {
    try{
        const { id } = req.params;
        const { user_name, last_name, email, password } = req.body;
        // findByIdAndUpdate recibe 3 parametros: el id del usuario o editar,
        // los datos a editar y un objetivo con la propiedad new: true
        const user = await UserModel.findByIdAndUpdate(
            id,
            {user_name, last_name, email, password},
            {new: true}
        );
        console.log(user);
        res.status(200).json(user);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        await UserModel.findByIdAndDelete(id);
        res.status(200).json({message: "User deleted"});
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createUser, getListUsers, getUserById, editUser, deleteUser};