"use client"

import { DetailedHTMLProps, TimeHTMLAttributes, useEffect, useState } from "react"


interface ClockProps extends DetailedHTMLProps<TimeHTMLAttributes<HTMLTimeElement>, HTMLTimeElement> {
}

const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
]
export const Clock = ({ className ,...restProps }: ClockProps) => {

    const [ date, setDate ] = useState(new Date())

    useEffect(() => {
        setInterval(() => {
            setDate(new Date())
        }, 1000)
    }, [])

    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    const second = date.getSeconds().toString().padStart(2, '0')


    return (
        <time 
            className={`
                flex flex-col items-center
                w-full p-8 gap-4
                text-black
                ${className}
            `} 
            {...restProps}
            suppressHydrationWarning
        >
            <h1 className="font-bold text-2xl">{hour}:{minute}:{second}</h1>
            <h2> {day} de {months[month]} de {year}</h2>
        </time>
    )
}