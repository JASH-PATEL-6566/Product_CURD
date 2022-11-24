import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';

function SharedRoute() {
    return (
        <div className='shared'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default SharedRoute;