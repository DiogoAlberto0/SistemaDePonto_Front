import Link from "next/link"
import { ComponentProps } from "react";

interface LinkButtonProps extends ComponentProps<typeof Link> {
    variant?: 'primary' | 'secondary';
}
export const LinkButton = ({ variant = 'primary', children, ...restProps}: LinkButtonProps) => {

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
        <Link
            className={style[variant]}
            {...restProps}
        >  
            {children}
        </Link>
    )
}