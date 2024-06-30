import { DetailedHTMLProps, ButtonHTMLAttributes } from "react"

interface ButtonClockingProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {

}

export const ButtonClocking = ({ children, className, ...restProps }: ButtonClockingProps) => {



    return (
        <button className={`
            h-[100px] w-[100px]
            bg-green-500 opacity-50 text-white
            rounded-full
            hover:opacity-100
            ${className}
        `}>
            {children}
        </button>
    )
}