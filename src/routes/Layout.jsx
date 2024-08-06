import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import FooterBar from '../components/FooterBar';

const Layout = () => {
  return (
    <div className="App">
      <NavBar />
      <SideBar />
      <Outlet />
      <FooterBar />
    </div>
  );
};

export default Layout;
