import { DetailedHTMLProps, ReactNode } from "react";

export interface ILabelInputProps extends DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    id: string;
    children: ReactNode;
    type: React.HTMLInputTypeAttribute;
    inputClassName?: string;
}
export const LabelInput = ({ children, id, className, type, inputClassName, ...restProps }: ILabelInputProps) => {

    return (
        <div className={`${className}`}>
            <label
                htmlFor={id}
                className="block text-green-700 text-sm font-bold mb-2"
            >
                {children}
            </label>
            <input
                id={id}
                className={`
                    ${type === 'checkbox' ?
                        'leading-tight h-5 w-5 text-green-600 focus:outline-none focus:shadow-outline focus:border-green-500'
                        :
                        `shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500 ${inputClassName}`
                    }    
                `}
                type={type}
                {...restProps}
            />
        </div>
    )
}

