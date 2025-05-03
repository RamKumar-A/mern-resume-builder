import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import Navbar from './Navbar';

function DashboardLayout({ activeMenu, children }) {
  const { user } = useContext(UserContext);
  return (
    <div className="px-4 xl:px-20 md:py-5">
      <Navbar activeMenu={activeMenu} />
      {user && <div className="container mx-auto pt-4 pb-4 ">{children}</div>}
    </div>
  );
}

export default DashboardLayout;
