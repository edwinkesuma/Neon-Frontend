import React from 'react';
import {Outlet} from "react-router";

const MainLayout = () => {
    return (
            <main className="max-w-6xl mx-auto px-6 py-8">
                <Outlet/>
            </main>
    );
};

export default MainLayout;