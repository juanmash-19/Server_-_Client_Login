import React, { useState } from "react";
import { User } from "../../request/User";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const userController = new User();

export const Register = () => {
    const [userName, setUserName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setrepeatPassword] = useState("");
    const [role, setRole] = useState("");
    const [activeStatus, setActiveStatus] = useState(false);

    const [showPassword, setShowPassword] = React.useState(false);
    const [showrepeatPassword, setShowrepeatPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowrepeatPassword = () => setShowrepeatPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };

    const hanldleRegister = async () => {
    const data = {
        user_name: userName,
        lastname,
        email,
        password,
        role,
        active_status: activeStatus,
    };
    const response = await userController.signUp(data);
    console.log(response);
    console.log(response.status);
    response.status == 201
        ? alert("Usuario registrado")
        : alert("Error al registrar usuario");
    };

    return (
    <>
        <div className="card-register">
        <TextField
            id="outlined-basic"
            label="Nombre"
            variant="standard"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
        />

        <TextField
            id="outlined-basic"
            label="Apellidos"
            variant="standard"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            fullWidth
        />

        <TextField
            id="outlined-basic"
            label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
        />
    <div className="row-style">
        <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                >
                {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
            }
            value={password}
        />

        <OutlinedInput
            id="repeatPassword"
            type={showrepeatPassword ? "text" : "password"}
            onChange={(e) => setrepeatPassword(e.target.value)}
            endAdornment={
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowrepeatPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                >
                {showrepeatPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
            }
            value={repeatPassword}
        />
    </div>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Rol</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Age"
            onChange={(e) => setRole(e.target.value)}
            >
            <MenuItem value={10}>Admin</MenuItem>
            <MenuItem value={20}>Guess</MenuItem>
            <MenuItem value={30}>Client</MenuItem>
            </Select>
        </FormControl>

        <Button
            variant="contained"
            disableElevation
            onClick={hanldleRegister}
        >
            Registrar usuario
        </Button>
        </div>
    </>
    );
};