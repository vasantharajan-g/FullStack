import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { styled } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const theme = createTheme();

const LoginContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(8),
});

const LoginForm = styled('form')({
  width: '100%',
  marginTop: theme.spacing(1),
});

const SubmitButton = styled(Button)({
  marginTop: theme.spacing(3),
});

const RegisterLink = styled(Link)({
  marginTop: theme.spacing(2),
  textDecoration: 'none',
  color: theme.palette.primary.main,
  cursor: 'pointer',
});

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success'); // or 'error' for failure

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    // Add your rules for a strong password
    const strongPasswordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setPasswordError(
        'Password should be at least 8 characters and include at least one letter, one number, and one special character'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    validateEmail();
    validatePassword();

    // For simplicity, let's assume successful login for any non-empty email and password
    if (email && password && !emailError && !passwordError) {

      try {
        const response = await fetch('http://127.0.0.1:5000/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username_or_email: email,
            password: password,
          }),
        });
    
        const data = await response.json();
    
        if (response.ok) {
          // Redirect to the dashboard after successful login
          // history.push('/dashboard');
          navigate('/dashboard');
          
          // Display success message
          handleSnackbar('Login successful!', 'success');
        } else {
          // Handle authentication error
          console.error('Authentication error:', data.error);
    
          // Display failure message
          handleSnackbar(`Authentication error: ${data.error}`, 'error');
        }
      } catch (error) {
        console.error('Error during login:', error);
    
        // Display error message
        handleSnackbar('Error during login. Please try again.', 'error');
      }
      
    }
    // You should implement actual authentication logic here
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {/* Use the styled components */}
        <LoginContainer>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <LoginForm>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              error={Boolean(emailError)}
              helperText={emailError}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePassword}
              error={Boolean(passwordError)}
              helperText={passwordError}
            />
            <SubmitButton
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Login
            </SubmitButton>
            <RegisterLink to="/register">Not a member? Register now</RegisterLink>
          </LoginForm>
          <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
        </LoginContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
