import { useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createUser } from "../services/userServices";

const NameRegex = /^[A-Z]{1}[A-Za-z ]{2,}$/;
const EmailRegex = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]){2,}.[a-z]*$/;
const passRegex = /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;
const mobRegex = /^[0-9]{10}$/;

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: ""
    });
    const [errors, setErrors] = useState({
        fullNameError: false,
        emailError: false,
        passwordError: false,
        phoneError: false
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
        // Reset errors on input change
        setErrors({
            fullNameError: false,
            emailError: false,
            passwordError: false,
            phoneError: false
        });
    };

    const newUser = async () => {
        // Validate full name
        if (!NameRegex.test(user.fullName)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                fullNameError: true
            }));
            return;
        }

        // Validate email
        if (!EmailRegex.test(user.email)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                emailError: true
            }));
            return;
        }

        // Validate password
        if (!passRegex.test(user.password)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                passwordError: true
            }));
            return;
        }

        // Validate phone
        if (!mobRegex.test(user.phone)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                phoneError: true
            }));
            return;
        }

        
        let response = await createUser(user);
        console.log(response);
        console.log(user)
    }; 

    return (
        <div className="flex flex-col gap-[24px]">
            <TextField
                id="fullName"
                label="Full Name"
                variant="outlined"
                size="small"
                value={user.fullName}
                onChange={handleChange}
                error={errors.fullNameError}
                helperText={errors.fullNameError ? "Enter correct Full Name" : ""}
            />
            <TextField
                id="email"
                label="Email Id"
                variant="outlined"
                size="small"
                value={user.email}
                onChange={handleChange}
                error={errors.emailError}
                helperText={errors.emailError ? "Enter correct Email" : ""}
            />
            <TextField
                id="password"
                label="Password"
                variant="outlined"
                size="small"
                type={showPassword ? 'text' : 'password'}
                value={user.password}
                onChange={handleChange}
                error={errors.passwordError}
                helperText={errors.passwordError ? "Enter correct Password" : ""}
                InputProps={{
                    endAdornment: (
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
                    )
                }}
            />
            <TextField
                id="phone"
                label="Mobile Number"
                variant="outlined"
                size="small"
                value={user.phone}
                onChange={handleChange}
                error={errors.phoneError}
                helperText={errors.phoneError ? "Enter correct Mobile Number" : ""}
            />
            <Button
                onClick={newUser}
                variant="contained"
                sx={{ textTransform: "none", backgroundColor: "#A03037" }}
            >
                Signup
            </Button>
        </div>
    );
}

export default Signup;
