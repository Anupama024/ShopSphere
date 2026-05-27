import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import LoginBgSlideshow from '../components/LoginBgSlideshow';
import Signup from '../components/Signup';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^[A-Za-z]+$/, "First name must only contain letters")
        .required("First name is required"),
    lastName: yup
        .string()
        .matches(/^[A-Za-z]+$/, "Last name must only contain letters")
        .required("Last name is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    mobile: yup
        .string()
        .matches(/^\d{10}$/, "Mobile must be exactly 10 digits")
        .matches(/^[0-9]+$/, "Mobile number must not contain letters")
        .required("Mobile is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain a lowercase letter")
        .matches(/[A-Z]/, "Password must contain an uppercase letter")
        .matches(/[0-9]/, "Password must contain a number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain a special character")
        .required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Confirm Password is required")
});



function SignupPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState("");

    const navigate = useNavigate();

    const handleOnClick = () => {
        // Only navigate if user explicitly clicks Login link
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobile("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
        navigate("/login");
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "mobile":
                setMobile(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
            default:
                break;
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
        if (snackbarMsg === 'Signup successful! Please login.') {
            navigate('/login');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            await validationSchema.validate(
                { firstName, lastName, email, mobile, password, confirmPassword },
                { abortEarly: false }
            );
            // Call backend signup API
            const { signup } = await import('../utils/api');
            const response = await signup({
                firstName,
                lastName,
                mobile,
                email,
                password
            });
            if (response.message === 'User created successfully') {
                setSnackbarMsg('Signup successful! Please login.');
                setSnackbarOpen(true);
                setFirstName(""); setLastName(""); setEmail(""); setMobile(""); setPassword(""); setConfirmPassword("");
            } else {
                setErrors({ api: response.message || 'Signup failed' });
            }
        } catch (err) {
            if (err.inner) {
                const formErrors = {};
                const passwordErrors = [];
                err.inner.forEach((validationError) => {
                    if (validationError.path === "password") {
                        passwordErrors.push(validationError.message);
                    } else {
                        formErrors[validationError.path] = validationError.message;
                    }
                });
                if (passwordErrors.length > 0) {
                    formErrors.password =
                        "Password must be 8+ chars, include uppercase, lowercase, number, special character.";
                }
                setErrors(formErrors);
            }
        }
    };

    return (
        <>
        <LoginBgSlideshow />
            <Signup
                firstName={firstName}
                lastName={lastName}
                email={email}
                mobile={mobile}
                password={password}
                confirmPassword={confirmPassword}
                login={handleOnClick}
                change={handleOnChange}
                onSubmit={handleSubmit}
                errors={errors}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity="success">
                    {snackbarMsg}
                </MuiAlert>
            </Snackbar>
        </>
    );
}

export default SignupPage