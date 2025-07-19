import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';
import Home from '../pages/Home';
import PremiumSection from '../components/HomeComponents/PremiumSection';

const HomeLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='my-30'>
                <Outlet>
              
            </Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default HomeLayout;