"use server"

import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";

export interface ICreateUserState {
    message: string | undefined;
    status: number | undefined;
}

export const handleCreateUser = async (prevState: ICreateUserState, e: FormData): Promise<ICreateUserState> => {

    const id = e.get('id')?.toString()
    const name = e.get('name')?.toString()
    const phone = e.get('phone')?.toString()
    const password = e.get('password')?.toString()

    const stationId = e.get('stationId')?.toString()
    const positionId = e.get('positionId')?.toString()

    console.log(id)


    if (!name || !phone || !password || !stationId || !positionId) return ({
        message: 'Preencha todos os campos',
        status: 400
    })


    try {
        if (!id) {
            const response = await userService.createNewUser({
                name,
                phone,
                password,
                stationId,
                positionId
            })

            console.log(response)

            if (!response.data) return ({
                message: response.error.message || 'ocorreu um erro inesperado',
                status: response.status
            })
            return ({
                message: response.data.message,
                status: response.status
            })
        } else {
            const response = await userService.updateUser({
                id,
                name,
                phone,
                password,
                stationId,
                positionId
            })
            console.log(response)
            if (!response.data) return ({
                message: response.error.message || 'ocorreu um erro inesperado',
                status: response.status
            })
            return ({
                message: response.data.message,
                status: response.status
            })
        }
    } catch (error: any) {
        throw new Error(error.message || 'Ocorreu um erro inesperado')
    } finally {
        revalidatePath('/admin/userRegisters')
    }
}