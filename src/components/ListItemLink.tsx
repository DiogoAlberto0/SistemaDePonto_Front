import Link from "next/link"
import { ComponentProps } from "react"

interface IListItemLinkProps extends ComponentProps<typeof Link> {
    variant?: 'primary' | 'secondary'
}
export const ListItemLink = ({ href, children, className, variant = 'primary', ...restProps }: IListItemLinkProps) => {

    const variants = {
        'primary': 'bg-gray-200 hover:bg-gray-400',
        'secondary': 'bg-green-400 hover:bg-green-500'
    }
    return (
        <li className={`${variants[variant]} rounded-md shadow-md ${className}`}>
            <Link
                href={href}
                className="block text-center p-4 text-black hover:text-white"
                {...restProps}
            >
                {children}
            </Link>
        </li>
    )
}