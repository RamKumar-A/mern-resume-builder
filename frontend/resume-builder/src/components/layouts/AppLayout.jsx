import { Link, Outlet } from 'react-router-dom';
import ProfileInfoCard from '../Cards/ProfileInfoCard';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { Box, Button, Container, Divider, Stack } from '@mui/material';
import AuthDialog from '../Modals/AuthDialog';
import { purple } from '@mui/material/colors';
function AppLayout() {
  const { user } = useContext(UserContext);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <Container fixed>
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
              bgcolor: purple[50],
              transitionProperty:
                'color background-color, border-color, outline-color, text-decoration-color, fill, stroke',
              transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              transitionDuration: '150ms',
              color: '#000',
              borderRadius: '0.5rem',
              fontSize: '0.8rem',
              textTransform: 'capitalize',
              '&:hover': {
                bgcolor: purple[600],
                color: '#fff',
              },
            }}
            size={'small'}
          >
            Login / Sign Up
          </Button>
        )}
      </Stack>
      <Divider />
      <Outlet />
      <AuthDialog
        isOpen={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
      />
    </Container>
  );
}

export default AppLayout;
