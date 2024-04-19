const UserModel = require("../models/user");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
    try {
        const { user_name, lastname, email, password, active_status, role } = req.body;
        const avatar = req.file ? req.file.filename : null;
        
        // Hashea la contraseña antes de guardar el usuario
        console.log(" sssss  ");
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            user_name,
            last_name:lastname,
            email,
            password: hashedPassword, // Guarda la contraseña hasheada
            active_status,
            role,
            avatar
        });
        console.log(user);
    
        const newUser = await user.save();
        console.log(newUser);
        res.status(201).json(newUser);
      } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
      }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        req.session.user = user;
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
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

module.exports = { createUser, getListUsers, getUserById, editUser, deleteUser, loginUser };    