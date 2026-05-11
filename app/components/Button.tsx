import React from 'react';

type ButtonProps = {
    isPrimary?: boolean;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: () => void;
}


const Button = ({
                    isPrimary, children, type = "button", disabled = false, onClick,
                }: ButtonProps) => {
    return (
        <button
            type={type ?? ""}
            disabled={disabled ?? false}
            onClick={onClick}
            className={`flex flex-row items-center justify-center gap-2 font-bold ${isPrimary ? "bg-red-600" : "bg-white"} ${isPrimary ? "text-white" : "text-red-600"} border border-red-600 px-10 py-3 rounded-md disabled:opacity-50`}>
            {children}
        </button>
    );
};

export default Button;