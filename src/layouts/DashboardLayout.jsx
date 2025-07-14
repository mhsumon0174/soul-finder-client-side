

import { Outlet } from 'react-router';
import SideBar from '../pages/DashBoard/SideBar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      
      <SideBar />

   
      <div className="flex-1 p-6">
        <Outlet /> 
      </div>
    </div>
  );
};

export default DashboardLayout;
