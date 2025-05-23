import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

function ProfileInfoCard() {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    clearUser();
    navigate('/');
  }
  return (
    user && (
      <Stack direction="row" alignItems="center" gap={1}>
        {user && user?.profileImageUrl ? (
          <img
            src={user?.profileImageUrl}
            alt={user?.name?.[0]}
            style={{
              width: '2.75rem',
              height: '2.75rem',
              backgroundColor: '#d1d5dc ',
              marginRight: '0.75rem',
            }}
            className="rounded-full "
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
            fontSize="13px"
            lineHeight="0.75rem"
            fontWeight="700"
            component="h3"
          >
            {user?.name || ''}
          </Typography>
          <button
            style={{
              color: purple[500],
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </Box>
      </Stack>
    )
  );
}

export default ProfileInfoCard;
