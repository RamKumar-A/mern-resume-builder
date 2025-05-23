import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';
import { Box, Button, Stack, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';

function SignUp({ setCurrentPage }) {
  const { updateUser } = useContext(UserContext);
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    let profileImageUrl = '';
    if (!fullName) {
      setError('Please enter full name.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter valid email');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError('');

    // Sign Up API Call
    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || '';
      }

      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
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
      {/* <Box py="0.25rem" pb="0.5rem">
        <Typography component="h3" fontSize={'1.25rem'} fontWeight={500}>
          Create an Account
        </Typography>
        <Typography
          component="p"
          fontSize="0.75rem"
          gutterBottom
          color={grey[700]}
        >
          Join us today by entering your details below.
        </Typography>
      </Box> */}

      <Box component="form" onSubmit={handleSignUp}>
        <Box>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        </Box>

        {/* <div className=""> */}
        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          label="Full Name"
          placeholder="John Doe"
          type="text"
        />

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
        {/* </div> */}
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
          SIGN UP
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
            Already have an account?{' '}
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
              onClick={() => setCurrentPage('login')}
            >
              Login
            </Typography>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default SignUp;
