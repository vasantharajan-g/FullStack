import React, { useState } from 'react';
import {
  Button,
  TextField,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom';

const FormContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: (theme) => theme.spacing(8),
});

const Form = styled('form')({
  width: '100%',
  marginTop: (theme) => theme.spacing(1),
});

const SubmitButton = styled(Button)({
  marginTop: (theme) => theme.spacing(3),
});

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      if (!username || !email || !password) {
        throw new Error('Please fill in all the required fields.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address.');
      }

      const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      if (!strongPasswordRegex.test(password)) {
        throw new Error(
          'Password should be at least 8 characters and include at least one letter, one number, and one special character'
        );
      }

      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setOpenDialog(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/login');
  };

  const RegisterLink = styled(Link)(({ theme }) => ({
    marginTop: theme.spacing(2),
    textDecoration: 'none',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  }));
  

  return (
    <FormContainer component="main" maxWidth="xs">
      <div className="backButton">
        <Typography component="h2" variant="h5">
          Register
        </Typography>
        <RegisterLink onClick={() => navigate(-1)}>
          Back
        </RegisterLink>
      </div>
      <Form>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!username}
          helperText={!username ? 'Username is required' : ''}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!email || !!error}
          helperText={!email ? 'Email is required' : '' || 'Please enter a valid email address'}
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
          error={!password || !!error}
          helperText={
            !password
              ? 'Password is required'
              : '' ||
                'Password should be at least 8 characters and include at least one letter, one number, and one special character'
          }
        />

        <SubmitButton
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleRegister}
        >
          Register
        </SubmitButton>

        {error && !password && (
          <Typography color="error" variant="body2" align="center" style={{ marginTop: '10px' }}>
            {error}
          </Typography>
        )}
      </Form>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <Typography color="textSecondary" variant="body2" align="center">
            You can now log in.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </FormContainer>
  );
};

export default Register;
