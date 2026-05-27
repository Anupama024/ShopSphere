
import { Paper, Stack, TextField, Box, Button, Typography, Link, IconButton, InputAdornment } from "@mui/material";
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './LoginCustom.css';
function SignUp({
    firstName,
    lastName,
    email,
    mobile,
    password,
    confirmPassword,
    login,
    change,
    onSubmit,
    errors = {}
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowPassword = (event) => {
        event.preventDefault();
        setShowPassword((show) => !show);
    };
    const handleMouseDownPassword = (event) => event.preventDefault();
    const handleClickShowConfirmPassword = (event) => {
        event.preventDefault();
        setShowConfirmPassword((show) => !show);
    };
    const handleMouseDownConfirmPassword = (event) => event.preventDefault();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 2,
                minHeight: '100vh',
            }}
        >
            <Stack sx={{ width: '100%', maxWidth: 400 }} spacing={1.2}>
                <Paper
                    elevation={0}
                    className="login-paper"
                    sx={{
                        p: { xs: 3, sm: 4 },
                        width: '100%',
                        maxWidth: 420,
                        margin: '0 auto',
                        borderRadius: 2,
                        background: 'none',
                        boxShadow: 'none',
                    }}
                >
                    <form onSubmit={onSubmit} noValidate autoComplete="off">
                        <Stack spacing={2}>
                            <Typography variant="h4" className="login-title">
                                Signup
                            </Typography>
                            {errors.api && (
                                <Typography variant="body2" sx={{ color: '#b71c1c', fontWeight: 600 }}>{errors.api}</Typography>
                            )}
                            <TextField
                                size="small"
                                label={<span style={{color:'#222',fontWeight:'bold'}}>First Name</span>}
                                name="firstName"
                                value={firstName}
                                onChange={change}
                                fullWidth
                                required
                                autoComplete="given-name"
                                error={Boolean(errors.firstName)}
                                helperText={<span style={{ color: '#b71c1c', fontWeight: 600 }}>{errors.firstName || " "}</span>}
                                sx={{ '& .MuiFormHelperText-root': { minHeight: '18px' } }}
                                InputProps={{
                                    style: {
                                        borderRadius: 30,
                                        background: 'rgba(255,255,255,0.7)',
                                        fontSize: 18,
                                    }
                                }}
                            />
                            <TextField
                                size="small"
                                label={<span style={{color:'#222',fontWeight:'bold'}}>Last Name</span>}
                                name="lastName"
                                value={lastName}
                                onChange={change}
                                fullWidth
                                required
                                autoComplete="family-name"
                                error={Boolean(errors.lastName)}
                                helperText={<span style={{ color: '#b71c1c', fontWeight: 600 }}>{errors.lastName || " "}</span>}
                                sx={{ '& .MuiFormHelperText-root': { minHeight: '18px' } }}
                                InputProps={{
                                    style: {
                                        borderRadius: 30,
                                        background: 'rgba(255,255,255,0.7)',
                                        fontSize: 18,
                                    }
                                }}
                            />
                            <TextField
                                size="small"
                                label={<span style={{color:'#222',fontWeight:'bold'}}>Mobile Number</span>}
                                name="mobile"
                                value={mobile}
                                onChange={change}
                                fullWidth
                                required
                                autoComplete="tel"
                                error={Boolean(errors.mobile)}
                                helperText={<span style={{ color: '#b71c1c', fontWeight: 600 }}>{errors.mobile || " "}</span>}
                                sx={{ '& .MuiFormHelperText-root': { minHeight: '18px' } }}
                                InputProps={{
                                    style: {
                                        borderRadius: 30,
                                        background: 'rgba(255,255,255,0.7)',
                                        fontSize: 18,
                                    }
                                }}
                            />
                            <TextField
                                size="small"
                                label={<span style={{color:'#222',fontWeight:'bold'}}>Email</span>}
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                value={email}
                                onChange={change}
                                required
                                fullWidth
                                autoComplete="new-email"
                                error={Boolean(errors.email)}
                                helperText={<span style={{ color: '#b71c1c', fontWeight: 600 }}>{errors.email || " "}</span>}
                                sx={{ '& .MuiFormHelperText-root': { minHeight: '18px' } }}
                                InputProps={{
                                    style: {
                                        borderRadius: 30,
                                        background: 'rgba(255,255,255,0.7)',
                                        fontSize: 18,
                                    }
                                }}
                            />
                            <TextField
                                size="small"
                                label={<span style={{color:'#222',fontWeight:'bold'}}>Password</span>}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter Password"
                                name="password"
                                value={password}
                                onChange={change}
                                required
                                fullWidth
                                autoComplete="new-password"
                                error={Boolean(errors.password)}
                                helperText={<span style={{ color: '#b71c1c', fontWeight: 600 }}>{errors.password || " "}</span>}
                                sx={{ '& .MuiFormHelperText-root': { minHeight: '18px' } }}
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
                            <TextField
                                size="small"
                                label={<span style={{color:'#222',fontWeight:'bold'}}>Confirm Password</span>}
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={change}
                                required
                                fullWidth
                                autoComplete="new-password"
                                error={Boolean(errors.confirmPassword)}
                                helperText={<span style={{ color: '#b71c1c', fontWeight: 600 }}>{errors.confirmPassword || " "}</span>}
                                sx={{ '& .MuiFormHelperText-root': { minHeight: '18px' } }}
                                InputProps={{
                                    style: {
                                        borderRadius: 30,
                                        background: 'rgba(255,255,255,0.7)',
                                        fontSize: 18,
                                    },
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onMouseDown={handleClickShowConfirmPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                variant="contained"
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
                                SignUp
                            </Button>
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <Typography variant="body2">
                                    Already existing user?
                                </Typography>
                                <Link component="button" onClick={login}>
                                    Login
                                </Link>
                            </Stack>
                        </Stack>
                    </form>
                </Paper>
            </Stack>
        </Box>
    );
}

export default SignUp;