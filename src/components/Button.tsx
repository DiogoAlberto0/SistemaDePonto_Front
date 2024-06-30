import { DetailedHTMLProps, ButtonHTMLAttributes } from "react"


interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
}
export const Button = ({ children, variant = 'primary', className,   ...restProps}: ButtonProps) => {

    const style = {
        'primary': `
            bg-green-500 text-white
            flex items-center justify-center
            px-4 py-2 rounded-md  
            hover:bg-green-800
        `,
        'secondary': ''
    }
    return(
        <button
            className={`${style[variant]}  ${className}`}
            {...restProps}
        >
            {children}
        </button>
    )
}