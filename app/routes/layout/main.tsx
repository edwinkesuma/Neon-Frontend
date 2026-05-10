import React from 'react';
import {Outlet} from "react-router";

const MainLayout = () => {
    return (
        <div>
            <section className="max-w-6xl mx-auto px-6 py-8">
                <Outlet/>
            </section>
        </div>
    );
};

export default MainLayout;