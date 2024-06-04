import { FC } from 'react';

type ButtonProps = {
    label: string;
    imgSrc: string;
    imgLabel: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({ className, label, imgSrc, imgLabel, ...props }) => {
    return (
        <button
            className={`h-fit w-fit self-center ${className}`}
            aria-label={label}
            {...props}
        >
            <img src={imgSrc} className="h-4 w-4" alt={imgLabel} />
        </button>
    );
};

export default Button;
