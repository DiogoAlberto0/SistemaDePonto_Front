"use client"
import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { getTimeSheetByYearAndMonth } from "../data";
import { ITimeSheet } from "@/Entitys/TimeSheet";
import { MapPin } from "@phosphor-icons/react/dist/ssr";

interface ITimeSheetProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    month: number;
    year: number;
    userId?: string;
}

export const TimeSheetAccordion = ({ userId, month, year, ...otherProps }: ITimeSheetProps) => {

    const [isOpened, setIsOpened] = useState(false)
    const [timeSheets, setTimeSheet] = useState<ITimeSheet[]>([])

    const getTimeSheet = async () => {

        if (!isOpened && !timeSheets.length) {
            try {
                const response = await getTimeSheetByYearAndMonth(year, month, userId)

                if (!response.data) {
                    throw new Error(`${response.status} | ${response.error.message || 'Ocorreu um erro inesperado'} `)
                }
                setTimeSheet(response.data.timeSheet)

            } catch (error: any) {
                throw new Error(error.message)
            }
        }
        setIsOpened(!isOpened)
    }

    return (
        <div onClick={() => getTimeSheet()} {...otherProps} >
            <div className="bg-gray-200 hover:bg-gray-400 text-center p-4 rounded-md shadow-md">
                {month}/{year}
            </div>
            {isOpened && timeSheets && <TimeSheetTable timeSheets={timeSheets} />}
        </div>
    )
}

const TimeSheetTable = ({ timeSheets }: { timeSheets: ITimeSheet[] }) => {
    return (
        <table className="w-full border-collapse">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border px-4 py-2">Dia</th>
                    <th className="border px-4 py-2">Entradas</th>
                    <th className="border px-4 py-2">Saídas</th>
                </tr>
            </thead>

            <tbody>
                {
                    timeSheets.map(({
                        id,
                        props: {
                            registeredDay,
                            registeredMonth,
                            registeredYear,
                            clockin: {
                                first_entrance,
                                second_entrance,
                                first_exit,
                                second_exit,
                                missed,
                                medicalCertificate
                            }
                        }
                    }) => {
                        return (
                            <tr key={id} className={`${missed ? 'bg-red-400 hover:bg-red-500' : 'bg-white hover:bg-gray-100'} ${medicalCertificate && 'bg-yellow-200 hover:bg-yellow-300'}`}>
                                <td className="border px-4 py-2">{registeredDay}/{registeredMonth}</td>
                                <td className="border px-4 py-2">
                                    <ClockinTime dateTime={first_entrance} />
                                    <ClockinTime dateTime={second_entrance} />
                                </td>
                                <td className="border px-4 py-2">
                                    <ClockinTime dateTime={first_exit} />
                                    <ClockinTime dateTime={second_exit} />
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

    )
}

const ClockinTime = ({ dateTime }: { dateTime: bigint | null }) => {

    const date = dateTime ? new Date(Number(dateTime)) : null
    const formatedDateTime = date ? `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}` : '-'
    return (
        <div className="flex justify-start items-center gap-1 text-sm">
            <MapPin className="text-gray-500" />
            <h2>
                {formatedDateTime}
            </h2>
        </div>
    )
}
