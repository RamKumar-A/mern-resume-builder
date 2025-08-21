import { Avatar, Box, Stack, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import LogoutDialog from '../Modals/LogoutDialog';
import ProfileModal from '../Modals/ProfileModal';

function ProfileInfoCard() {
  const { user, clearUser } = useContext(UserContext);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    // localStorage.clear();
    clearUser();
    navigate('/');
  }
  return (
    user && (
      <>
        <Stack
          direction="row"
          alignItems="center"
          gap="0.25rem"
          component="div"
          onClick={() => {
            setOpenProfileModal(true);
          }}
        >
          {user && user?.profileImageUrl ? (
            <img
              src={user?.profileImageUrl}
              alt={user?.name?.[0]}
              style={{
                width: '2.75rem',
                height: '2.75rem',
                backgroundColor: '#d1d5dc ',
                marginRight: '0.75rem',
                objectFit: 'cover',
              }}
              className="rounded-full"
            />
          ) : (
            <Avatar
              src="/default-user.jpg"
              alt={user?.name?.[0]}
              sx={{ width: 35, height: 35 }}
            />
          )}
          <Box>
            <Typography
              fontSize="0.65rem"
              lineHeight="0.75rem"
              fontWeight="600"
              component="h3"
            >
              {user?.name || ''}
            </Typography>
            <button
              style={{
                color: purple[500],
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setLogoutDialogOpen(true);
              }}
            >
              Logout
            </button>
          </Box>
        </Stack>
        <LogoutDialog
          open={logoutDialogOpen}
          onClose={() => setLogoutDialogOpen(false)}
          handler={handleLogout}
        />
        <ProfileModal
          open={openProfileModal}
          onClose={() => setOpenProfileModal(false)}
        />
      </>
    )
  );
}

export default ProfileInfoCard;
