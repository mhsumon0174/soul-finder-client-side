import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';
import Home from '../pages/Home';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className=''>
                <Outlet>
                <Home></Home>
            </Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;