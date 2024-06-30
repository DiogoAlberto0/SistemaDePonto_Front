"use server"

import { clockinService } from "@/services/clockin.service"
import { timeSheetService } from "@/services/timeSheets.service";
import { revalidatePath } from "next/cache";


export interface ClockinStateType {
    status: number | undefined;
    statusText: string | undefined;
    error: string | undefined;
    successMessage: string | undefined;
}
export const handleClockin = async (prevState: ClockinStateType, e: FormData): Promise<ClockinStateType> => {

    const latitude = Number(e.get('latitude'))
    const longitude = Number(e.get('longitude'))

    if(!latitude || ! longitude || isNaN(latitude) || isNaN(longitude)) return {
        error: 'Não foi possivel localizar o dispositivo',
        status: 400,
        statusText: 'Bad request',
        successMessage: undefined
    }

    try {

        const response = await clockinService.clockin({ latitude, longitude })

        console.log(response)

        if(!response.data) return {
            status: response.status,
            statusText: response.statusText,
            error: response.error.message,
            successMessage: undefined
        }

        return {
            status: response.status,
            statusText: response.statusText,
            error: undefined,
            successMessage: response.data.message
        }
        
    } catch (error: any) {
        return {
            status: 500,
            statusText: 'Internal server error',
            error: error.message || 'Ocorreu um erro inesperado',
            successMessage: undefined
        }
    }

    revalidatePath('/clockin')
}

export const getLastRegister = async () => {

        const response = await timeSheetService.getLastRegister()

        return response
}