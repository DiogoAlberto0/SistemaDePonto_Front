import { DetailedHTMLProps, HTMLAttributes } from "react"

interface IMain extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    
}

export const FormMain = ({ children, className, ...restProps}: IMain) => {
    return (
        <main
            className={`min-h-screen p-4 flex justify-center items-center bg-gray-100 ${className}`}
            {...restProps}
        >
            {children}
        </main>
    )
}
