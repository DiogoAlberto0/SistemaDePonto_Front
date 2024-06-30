"use server"

import { timeSheetService } from "@/services/timeSheets.service"

const parseDateAndTimeStringToMiliseconds = (dateString: string | undefined, timeString?: string) => {
    return dateString && timeString ? new Date(`${dateString} ${timeString || ''}`).getTime() : null
}
export const handleSignin = async (preventState: any, e: FormData) => {

    const userId = e.get('userId')?.toString()
    const missed = e.get('missed')?.toString()

    const dateString = e.get('date')?.toString()
    const date = dateString ? new Date(dateString) : undefined

    const first_entrance = parseDateAndTimeStringToMiliseconds(dateString, e.get('first_entrance')?.toString())
    const second_entrance = parseDateAndTimeStringToMiliseconds(dateString, e.get('second_entrance')?.toString())
    const first_exit = parseDateAndTimeStringToMiliseconds(dateString, e.get('first_exit')?.toString())
    const second_exit = parseDateAndTimeStringToMiliseconds(dateString, e.get('second_exit')?.toString())

    try {
        const response = await timeSheetService.updateTimeSheetByUserId({
            userId: userId,
            registeredDay: date?.getUTCDate(),
            registeredMonth: date?.getUTCMonth(),
            registeredYear: date?.getUTCFullYear(),
            first_entrance,
            first_exit,
            second_entrance,
            second_exit,
            medicalCertificate: false,
            missed: missed ? true : false
    
        })
    
        if(!response.data) return {
            message: response.error.message || 'Ocorreu um erro inesperado',
            status: response.status
        }
        return {
            message: response.data.message,
            status: response.status
        }
    } catch (error: any) {
        return {
            message: error.message || 'Ocorreu um erro inesperado',
            status: 500
        }
    }
}