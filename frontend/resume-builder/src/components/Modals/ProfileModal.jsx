import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { purple, red } from '@mui/material/colors';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import LogoutDialog from './LogoutDialog';
import PasswordEditDialog from './PasswordEditDialog';
import ProfileEditDialog from './ProfileEditDialog';

function ProfileModal({ open, onClose }) {
  const { user } = useContext(UserContext);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editPasswordOpen, setEditPasswordOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle fontSize="1.1rem">Account Details</DialogTitle>
        <DialogContent
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.2rem',
          }}
          dividers
        >
          <Avatar
            src={
              user && user?.profileImageUrl
                ? user?.profileImageUrl
                : '/default-user.jpg'
            }
            alt={user?.name?.[0]}
            sx={{
              width: 75,
              height: 75,
              border: '0.1rem solid',
              borderColor: purple[200],
            }}
          />
          <Stack gap="0.5rem">
            <DialogContentText color="#0a0a0a">
              <Typography component="span" fontWeight="600">
                Email:{' '}
              </Typography>
              {user?.email}
            </DialogContentText>
            <DialogContentText textTransform="capitalize" color="#0a0a0a">
              <Typography component="span" fontWeight="600">
                Name:{' '}
              </Typography>
              {user?.name}
            </DialogContentText>
          </Stack>
        </DialogContent>
        <DialogActions
          sx={{
            width: '100%',
            p: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            rowGap: '1rem',
          }}
        >
          <Button
            variant="contained"
            sx={{ bgcolor: purple[100], color: purple[700] }}
            size="small"
            onClick={() => setEditProfileOpen(true)}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: purple[100], color: purple[700] }}
            size="small"
            onClick={() => setEditPasswordOpen(true)}
          >
            Edit Password
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{ bgcolor: red[500] }}
            onClick={() => setLogoutDialogOpen(true)}
          >
            Logout
          </Button>
        </DialogActions>
        <ProfileEditDialog
          open={editProfileOpen}
          onClose={() => setEditProfileOpen(false)}
        />
        <PasswordEditDialog
          open={editPasswordOpen}
          onClose={() => setEditPasswordOpen(false)}
        />
        <LogoutDialog
          open={logoutDialogOpen}
          onClose={() => setLogoutDialogOpen(false)}
        />
      </Dialog>
    </>
  );
}

export default ProfileModal;
