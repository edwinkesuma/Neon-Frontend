import React from 'react';
import {NavLink, Outlet} from "react-router";

const DashboardLayout = () => {
    const base = "text-lg text-gray-500 border-b-1 border-gray-400 transition hover:text-red-600 hover:font-bold pb-2 my-2 mr-4";
    const active = "font-bold text-lg text-red-600 border-b-2 border-red-600 pb-2 my-2 mr-4";

    return (
        <main className="flex flex-row max-w-6xl mx-auto px-6 py-8">
            <nav className="flex flex-col border-r-4 border-red-600 w-37.5">
                <NavLink className={({isActive}) => isActive ? active : base}
                         to="/admin/categories">Category</NavLink>
                <NavLink className={({isActive}) => isActive ? active : base} to="/admin/products">Product</NavLink>

            </nav>
            <section>
                <Outlet/>
            </section>
        </main>
    );
};

export default DashboardLayout;