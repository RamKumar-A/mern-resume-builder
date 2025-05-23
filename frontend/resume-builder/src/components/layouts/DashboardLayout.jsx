import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Box } from '@mui/material';

function DashboardLayout({ children }) {
  const { user } = useContext(UserContext);
  return (
    <Box>
      {/* <Navbar activeMenu={activeMenu} /> */}
      {user && <Box py="1rem">{children}</Box>}
    </Box>
  );
}

export default DashboardLayout;
