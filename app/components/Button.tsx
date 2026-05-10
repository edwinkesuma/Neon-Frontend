import React from 'react';

type ButtonProps = {
    isPrimary: boolean;
    children: React.ReactNode;
}


const Button = ({isPrimary, children}: ButtonProps) => {
    return (
        <div className={`flex flex-row items-center justify-center gap-2 ${isPrimary?"bg-red-600":"bg-white"} ${isPrimary?"text-white":"text-red-600"} border border-red-600 px-10 py-3 rounded-md`}>
            {children}
        </div>
    );
};

export default Button;