import { Container, Divider } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AuthDialog from '../Modals/AuthDialog';
import Navbar from './Navbar';

function AppLayout() {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <Container fixed>
      <Navbar setOpenAuthModal={setOpenAuthModal} />
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
