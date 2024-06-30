import { CaretLeft } from "@phosphor-icons/react/dist/ssr"
import Link, { LinkProps } from "next/link"


interface BackButtonProps extends LinkProps {
    className?: string;
}

export const BackButton = ({ className, ...restProps }: BackButtonProps) => {


    return (
        <Link
            {...restProps}
            className={`
                absolute z-10 left-4 top-4
                bg-green-500 bg-opacity-50 text-white hover:bg-opacity-100
                rounded-full p-2
                ${className}
            `}>
            <CaretLeft size={32} />
        </Link>
    )
}