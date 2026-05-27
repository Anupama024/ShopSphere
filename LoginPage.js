import React, { useState } from 'react';
import LoginBgSlideshow from '../components/LoginBgSlideshow';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Login from '../components/Login';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleOnClick = () => {
    navigate("/signup");
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { login } = await import('../utils/api');
      const response = await login({ email, password });
      if (response.token) {
        // Save JWT token for authenticated requests
        localStorage.setItem('token', response.token);
        // Save user info for HomePage avatar
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        setSnackbarMsg('Login successful!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        setTimeout(() => navigate('/home'), 1500);
      } else {
        setError(response.message || 'Login failed');
        setSnackbarMsg(response.message || 'Login failed');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    } catch (err) {
      setError('Login failed');
      setSnackbarMsg('Login failed');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <LoginBgSlideshow />
      <Login
        email={email}
        password={password}
        onSignup={handleOnClick}
        change={handleOnChange}
        onSubmit={handleLogin}
        error={error}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMsg}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default LoginPage