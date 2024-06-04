import { FC } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
    label: string;
}

const Button: FC<ButtonProps> = ({ children, className, label, ...props }) => {
    return (
        <button
            {...props}
            className={`button-hover-effect hover:scale-110 ${className}`}
            aria-label={label}
        >
            {children}
        </button>
    );
};

export default Button;