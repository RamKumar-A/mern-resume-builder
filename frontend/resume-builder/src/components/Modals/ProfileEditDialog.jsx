import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import ProfilePhotoSelector from '../Inputs/ProfilePhotoSelector';
import { useContext, useState } from 'react';
import { purple, red } from '@mui/material/colors';
import Input from '../Inputs/Input';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPaths';

function ProfileEditDialog({ open, onClose }) {
  const { user } = useContext(UserContext);

  const [profilePic, setProfilePic] = useState(user?.profileImageUrl);
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) {
      setError('Please enter your full name to update');
      return;
    }
    if (!email) {
      setError('Please enter your email to update');
      return;
    }
    try {
      const response = await axiosInstance.patch(
        API_PATH.USER.UPDATE_ME,
        {
          name: fullName,
          email: email,
          profileImageUrl: profilePic,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.status === 201) {
        onClose();
      }
      // console.log(response);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
    setError(null);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle fontSize="1.1rem">Edit Profile</DialogTitle>
      <DialogContent dividers>
        <Box
          component="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <Box>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </Box>

          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
            id="fullname"
          />

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
            id="email"
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
            Update
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default ProfileEditDialog;
