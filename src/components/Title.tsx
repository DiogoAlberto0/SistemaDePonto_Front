import { DetailedHTMLProps, HTMLAttributes } from "react"

interface ITitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>{
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5',
    size?: 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl',
    weight?: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'
}
export const Title = ({ as, children, size = 'xl', className, weight = 'extrabold', ...restProps }: ITitleProps) => {

    const Element = as
    return (
        <Element
            className={`text-${size} font-${weight} text-green-600 mb-4 text-center ${className}`}
            {...restProps}
        >
            {children}
        </Element>
    )
}