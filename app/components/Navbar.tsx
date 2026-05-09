import React from 'react';
import {NavLink} from "react-router";
import {FaLightbulb, FaShoppingCart} from "react-icons/fa";

const Navbar = () => {
    return (
        <nav className="bg-red-600 border-b border-red-700 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                <NavLink to="/" className="flex items-center gap-2 text-xl font-bold text-white">
                    <FaLightbulb className="text-white text-2xl"/>
                    Neon
                </NavLink>

                <FaShoppingCart className="text-white text-2xl"/>
            </div>
        </nav>
    );
};

export default Navbar;