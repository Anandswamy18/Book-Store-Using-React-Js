import React, { useState } from 'react';
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "../services/userServices";
import { useNavigate } from 'react-router-dom';


const emailRegex = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]){2,}.[a-z]*$/;
const passwordRegex = /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;

function Login() {
    const nav=useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [errorObj, setErrorObj] = useState({
        emailError: false,
        emailHelper: "",
        passwordError: false,
        passwordHelper: "",
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
    };

    const validateEmail = (email) => {
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return passwordRegex.test(password);
    };

    const userLogin = async () => {
        if (!validateEmail(user.email)) {
            setErrorObj((prevState) => ({
                ...prevState,
                emailError: true,
                emailHelper: "Enter a valid email",
            }));
            return;
        }

        if (!validatePassword(user.password)) {
            setErrorObj((prevState) => ({
                ...prevState,
                passwordError: true,
                passwordHelper: "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.",
            }));
            return;
        }

       
        setErrorObj({
            emailError: false,
            emailHelper: "",
            passwordError: false,
            passwordHelper: "",
        });

        // Proceed with login
        try {
            let response = await login(user);
            console.log(response);
            const accessToken = response.data.result.accessToken;
           
            console.log(accessToken);
            localStorage.setItem("tokens", accessToken);
            
            nav("/")
            
           
           
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (
        <div className="flex flex-col">
            <TextField
                id="email"
                label="Email Id"
                variant="outlined"
                size="small"
                value={user.email}
                onChange={handleChange}
                error={errorObj.emailError}
                helperText={errorObj.emailHelper}
            /><br />
            <TextField
                id="password"
                label="Password"
                size="small"
                type={showPassword ? 'text' : 'password'}
                value={user.password}
                onChange={handleChange}
                error={errorObj.passwordError}
                helperText={errorObj.passwordHelper}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
            <label className="flex justify-end mb-[30px] text-[#9D9D9D] font-[Roboto] text-sm">Forgot Password?</label>
            <Button onClick={userLogin} variant="contained" sx={{ textTransform: "none", backgroundColor: "#A03037" }}>Login</Button>
            <div className="flex justify-center items-center">
                <div className="flex-1 h-[1.8px] bg-[#c8c8c8] rounded" />
                <div className="p-5 text-[#343434] font-[system-ui] text-lg font-bold">OR</div>
                <div className="flex-1 h-[1.8px] bg-[#c8c8c8] rounded" />
            </div>
            <div className="flex justify-between">
                <Button variant="contained" sx={{ textTransform: "none", backgroundColor: "#4266B2", width: '130px' }} size="large">Facebook</Button>
                <Button variant="contained" sx={{ textTransform: "none", backgroundColor: "#F5F5F5", color: "black", width: '130px' }} size="large">Google</Button>
            </div>
        </div>
    );
}

export default Login;
    