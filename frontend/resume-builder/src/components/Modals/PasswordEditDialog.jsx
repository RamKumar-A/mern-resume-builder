import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import Input from '../Inputs/Input';
import { purple, red } from '@mui/material/colors';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPaths';

function PasswordEditDialog({ open, onClose }) {
  const [error, setError] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!currentPassword) {
      setError('Please enter the current password');
      return;
    }
    if (!confirmPassword) {
      setError('Please confirm the password');
      return;
    }
    if (!password) {
      setError('Please enter the password');
      return;
    }

    if (confirmPassword !== password) {
      setError('Both password and confirm password must be same');
      return;
    }

    try {
      const response = await axiosInstance.patch(
        API_PATH.USER.UPDATE_MY_PASSWORD,
        {
          passwordCurrent: currentPassword,
          password: password,
          passwordConfirm: confirmPassword,
        }
      );

      if (response.status === 201) {
        onClose();
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
    setError('');
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle fontSize="1.1rem">Edit Password</DialogTitle>
      <DialogContent dividers>
        <Box component="form" onSubmit={handleSubmit}>
          <Input
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
            }}
            label="Current Password"
            placeholder="Current Password"
            type="password"
            id="current_password"
          />

          <Input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
            id="password"
          />
          <Input
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            label="Confirm Password"
            placeholder="Confirm passsword"
            type="password"
            id="confirm_password"
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
            sx={{ bgcolor: purple[600] }}
            type="submit"
            fullWidth
          >
            Change Password
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default PasswordEditDialog;
