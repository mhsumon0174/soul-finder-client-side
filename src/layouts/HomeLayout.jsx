import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';
import Home from '../pages/Home';
import PremiumSection from '../components/HomeComponents/PremiumSection';

const HomeLayout = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className='my-30 container mx-auto'>
                <Outlet>
              
            </Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;