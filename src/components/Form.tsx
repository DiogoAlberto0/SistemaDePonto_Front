"use client"

import { DetailedHTMLProps, FormHTMLAttributes } from "react"

interface IFormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>{
    
}
export const Form = ({ children, className, ...restProps }: IFormProps) => {


    return (
        <form 
            className={`bg-white flex flex-col gap-2 p-6 rounded-md shadow-md w-full max-w-md border border-green-300  ${className}`}    
            {...restProps}
        >
            {children}
        </form>
    )
}