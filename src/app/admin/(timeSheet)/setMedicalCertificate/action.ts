"use server"

import { timeSheetService } from "@/services/timeSheets.service"

export type State = {
    message: string | undefined;
    status: number | undefined;
}
export const handleSignin = async (preventState: State, e: FormData): Promise<State> => {

    
    const userId = e.get('userId')?.toString()
    
    const startsAt = e.get('startsAt') ? new Date(String(e.get('startsAt')?.toString())).toUTCString() : undefined
    const endsAt = e.get('endsAt') ? new Date(String(e.get('endsAt')?.toString())).toUTCString() : undefined

    if(!userId || !startsAt || !endsAt) return ({
        status: 400,
        message: 'Informe o usuário, a data de inicio e a data de término'
    })

    try {
        const response = await timeSheetService.setMedicalCertificateByUserId({
            userId,
            startsAt,
            endsAt
        })

        if(!response.data) {
            return ({
                status: response.status,
                message: response.error.message || 'Ocorreu um erro inesperado, tente novamente'
            })
        }
        return {
            message: response.data.message,
            status: 200
        }
    } catch (error: any) {
        throw new Error(error)
    }
}