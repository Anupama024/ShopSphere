import React, { useState } from 'react'
import  {Box, Button, Link, Paper, Stack, TextField, Typography, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './LoginCustom.css';

function Login({ email, password, onSignup, change, onSubmit, error }) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = (event) => {
        event.preventDefault();
        setShowPassword((show) => !show);
    };
    const handleMouseDownPassword = (event) => event.preventDefault();
    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                px: 2,
            }}>
                <Stack spacing={4}
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                    }}>
                    <Paper elevation={0} className="login-paper"
                        sx={{
                            p: { xs: 3, sm: 4 },
                            borderRadius: 2,
                            background: 'none',
                            boxShadow: 'none',
                        }}>
                        <form onSubmit={onSubmit} noValidate autoComplete="off">
                            <Stack spacing={2}>
                                <Typography variant='h4' className="login-title">
                                    Login
                                </Typography>
                                {error && <Typography color="error" variant="body2">{error}</Typography>}
                                <TextField
                                    name="email"
                                    label={<span style={{color:'#222',fontWeight:'bold'}}>Email</span>}
                                    placeholder="Enter Email"
                                    type='email'
                                    onChange={change}
                                    value={email}
                                    required
                                    fullWidth
                                    InputProps={{
                                        style: {
                                            borderRadius: 30,
                                            background: 'rgba(255,255,255,0.7)',
                                            fontSize: 18,
                                        }
                                    }}
                                />
                                <TextField
                                    name="password"
                                    label={<span style={{color:'#222',fontWeight:'bold'}}>Password</span>}
                                    placeholder='Enter Password'
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={change}
                                    value={password}
                                    required
                                    fullWidth
                                    InputProps={{
                                        style: {
                                            borderRadius: 30,
                                            background: 'rgba(255,255,255,0.7)',
                                            fontSize: 18,
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onMouseDown={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    variant='contained'
                                    type="submit"
                                    sx={{
                                        borderRadius: 30,
                                        fontWeight: 700,
                                        fontSize: 18,
                                        py: 1.2,
                                        background: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)',
                                        boxShadow: '0 4px 16px rgba(30,60,114,0.2)',
                                        color: '#fff',
                                        mt: 1,
                                        '&:hover': {
                                            background: 'linear-gradient(90deg, #2a5298 0%, #1e3c72 100%)',
                                        }
                                    }}
                                >
                                    Login
                                </Button>
                                <Stack direction='row' justifyContent='center' spacing={2}>
                                    <Typography variant='body2'>
                                        New User?{" "}
                                    </Typography>
                                    <Link component="button" onClick={onSignup}>
                                        SignUp
                                    </Link>
                                </Stack>
                            </Stack>
                        </form>
                    </Paper>
                </Stack>
            </Box>
        </>
    );
}

export default Login