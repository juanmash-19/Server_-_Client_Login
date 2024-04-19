import React, { useState } from 'react';
import { User } from "../../request/User"; 
import TextField from '@mui/material/TextField';
import VisibilityOff from '@mui/icons-material/VisibilityOff'; 
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';

import { useNavigate } from 'react-router-dom';

const userController = new User();

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const data = {
            email,
            password,
        }
        try {
            const response = await userController.login(data); 
            console.log(response);
            if (response.status === 200) {
                alert("Autenticación exitosa");
                navigate('/dashboard'); 
            } else {
                alert("Error en el usuario o contraseña ");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    return (
        <div className='card-login'>
            <TextField 
                id="standard-basic" 
                label="Email" 
                variant="standard" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type='email' 
                fullWidth
            />

            <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                    <VisibilityOff onClick={() => setShowPassword(!showPassword)} />
                }
                label="Password"
                value={password}
            />

            <Button onClick={handleLogin} variant="contained">Iniciar sesión</Button>
        </div>
    );
};

export default Login;
