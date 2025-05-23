import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import Input from '../../components/Inputs/Input';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPaths';
import { Box, Button, Stack, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';

function Login({ setCurrentPage }) {
  const [email, setEmail] = useState('ram@example.com');
  const [password, setPassword] = useState('test1234');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError('');

    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  }

  return (
    <Box width="100%" p="0.25rem">
      <Box component="form" onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
          id="email"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
          id="password"
        />

        {error && (
          <Typography
            component="p"
            color={red[500]}
            pb="0.625rem"
            fontSize="0.75rem"
          >
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          sx={{ bgcolor: '#000' }}
          type="submit"
          fullWidth
        >
          LOGIN
        </Button>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography
            component="div"
            fontSize="13px"
            gutterBottom
            color={grey[800]}
            pt={3}
            textTransform="center"
          >
            Don&apos;t have an account?{' '}
            <Typography
              fontSize="13px"
              component="span"
              color="#932be7"
              width="fit-content"
              textTransform="capitalize"
              sx={{
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => setCurrentPage('signup')}
            >
              SignUp
            </Typography>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default Login;
