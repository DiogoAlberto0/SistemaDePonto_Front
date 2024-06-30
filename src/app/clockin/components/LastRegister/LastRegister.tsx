"use client"
//next
import { DetailedHTMLProps, HTMLAttributes } from "react"
import Link from "next/link";

//icon
import { CaretUp } from "@phosphor-icons/react/dist/ssr";

//data
import { useLastRegister } from "./useLastRegister";

interface LastRegisterProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    updateOnChange?: any
}

export const LastRegister = ({ className, updateOnChange, ...restProps }: LastRegisterProps) => {

    const lastRegister = useLastRegister(updateOnChange)

    return (
        <div
            className={`
                bg-white flex justify-between p-4 px-8 w-full bg-opacity-80
                ${className}
            `}
            {...restProps}
        >
            <div className="flex  justify-center items-center gap-2">
                <div className="bg-green-500 h-2 w-2 rounded-full"></div>
                <h3 className="font-medium">{lastRegister.time}</h3>
                <p>{lastRegister.type}</p>
            </div>

            <Link className="hover:bg-gray-300" href="/timesheet">
                <CaretUp className="text-blue-500" size={32} />
            </Link>
        </div>
    )
}