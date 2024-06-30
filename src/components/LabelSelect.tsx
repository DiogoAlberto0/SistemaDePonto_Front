import { DetailedHTMLProps, SelectHTMLAttributes } from "react"

interface LabelSelectProps extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>{
    label: string;
}
export const LabelSelect = ({ id, children, className, label, ...restProps}: LabelSelectProps) => {


    return (
        <div className={`mb-4 ${className}`}>
        <label htmlFor={id} className="block text-green-700 text-sm font-bold mb-2">{label}</label>
        <select 
            id={id}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500 ${!children && 'text-red-500'}`}
            {...restProps}
        >
            {children}
        </select>
    </div>
    )
}