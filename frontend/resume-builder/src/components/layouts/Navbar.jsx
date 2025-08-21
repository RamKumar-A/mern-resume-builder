import { Link } from 'react-router-dom';
import ProfileInfoCard from '../Cards/ProfileInfoCard';
import { Box, Button, Stack } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { purple } from '@mui/material/colors';

function Navbar({ setOpenAuthModal }) {
  const { user } = useContext(UserContext);

  return (
    <Stack
      className=""
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      pt={3}
      mb={2}
    >
      <Box
        component={Link}
        fontSize={{ sm: '1.25rem' }}
        fontWeight="700"
        to="/"
      >
        Resume Builder
      </Box>
      {user ? (
        <ProfileInfoCard />
      ) : (
        <Button
          variant="contained"
          onClick={() => setOpenAuthModal(true)}
          sx={{
            boxShadow: 1,
            bgcolor: purple[50],
            color: purple[500],
            transitionProperty:
              'color background-color, border-color, outline-color, text-decoration-color, fill, stroke',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
            transitionDuration: '150ms',
            borderRadius: '0.5rem',
            fontSize: '0.8rem',
            textTransform: 'capitalize',
            '&:hover': {
              bgcolor: purple[500],
              color: '#fff',
            },
          }}
          size="small"
        >
          Login / Sign Up
        </Button>
      )}
    </Stack>
  );
}

export default Navbar;
