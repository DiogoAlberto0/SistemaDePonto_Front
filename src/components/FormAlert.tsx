import { DetailedHTMLProps, HTMLAttributes } from "react"



interface FormAlertProps extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
    variant?: 'success' | 'danger'
}

export const FormAlert = ({ children, variant = 'success', className, ...otherProps }: FormAlertProps) => {

    const alertVariant = {
        'success': `
            bg-green-500
        `,
        'danger': `
            bg-red-500
        `
    }
    return (
        <span
            className={`${alertVariant[variant]} flex justify-center items-center text-white p-2 ${className}`}
            {...otherProps}
        >
            {children}
        </span>
    )
}