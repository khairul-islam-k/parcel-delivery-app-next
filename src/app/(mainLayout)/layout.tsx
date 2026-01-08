import React from 'react';
import Navbar from '../components/navbar/Navbar';

const layout = ({children}: {children: React.ReactNode}) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
            <div>khairul islam </div>
        </div>
    );
};

export default layout;