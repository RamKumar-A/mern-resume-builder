import { useState } from 'react';
import Login from '../../pages/Auth/Login';
import SignUp from '../../pages/Auth/SignUp';
import { Box, Dialog, DialogTitle, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

function AuthDialog({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState('login');

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {currentPage === 'signup' && (
          <>
            <Typography component="p" fontSize={'1.25rem'} fontWeight={500}>
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
          </>
        )}
        {currentPage === 'login' && (
          <>
            <Typography component="p" fontSize="1.25rem" fontWeight={500}>
              Welcome Back
            </Typography>
            <Typography
              component="p"
              fontSize="0.75rem"
              gutterBottom
              color={grey[700]}
            >
              Please enter your details to log in
            </Typography>
          </>
        )}
      </DialogTitle>
      <Box sx={{ p: { xs: 0.5, sm: 2 } }}>
        {currentPage === 'login' && (
          <Login setCurrentPage={setCurrentPage} onClose={onClose} />
        )}
        {currentPage === 'signup' && <SignUp setCurrentPage={setCurrentPage} />}
      </Box>
    </Dialog>
  );
}

export default AuthDialog;
