import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { GridContainer, device } from '../../globalStyles';
import { AdminNavbar } from '../Navbar';

const AdminContainer = styled(GridContainer)`
  @media screen and (${device.md}) {
    grid-template-columns: 1fr 7fr;
  }

  @media screen and (${device.lg}) {
    grid-template-columns: 1fr 4.5fr;
  }
`;

export default function AdminLayout() {
  return (
    <AdminContainer>
      <div className="fr1">
        <AdminNavbar />
      </div>
      <div className="fr2">
        <Outlet />
      </div>
    </AdminContainer>
  );
}
