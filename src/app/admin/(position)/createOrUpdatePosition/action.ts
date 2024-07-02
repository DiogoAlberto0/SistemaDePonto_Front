"use server"
import { positionService } from "@/services/position.service";
import { revalidatePath } from "next/cache";

export interface State {
    message: string | undefined;
    status: number | undefined;
}

export const handleCreateOrUpdatePosition = async (prevState: State, e: FormData): Promise<State> => {

    const id = e.get('id')?.toString()
    const office = e.get('office')?.toString()
    const privilegeLevel = e.get('privillegeLevel')?.toString()

    console.log(id)
    console.log(office)
    console.log(privilegeLevel)
    if(!office || !privilegeLevel || isNaN(Number(privilegeLevel))) return ({
        message: 'Preencha todos os campos',
        status: 400
    })

    try {
        if(!id) {
            const response = await positionService.createNewPosition({
                props: {
                    office,
                    privillegeLevel: Number(privilegeLevel)
                }
            })

            if(!response.data && response.status !== 400) throw new Error(`${response.status} | ${ response.error.message || 'Ocorreu um erro inesperado'}`)

            if(!response.data && response.status === 400) return ({
                message: response.error.message || 'Ocorreu um erro inesperado',
                status: response.status
            })

            return ({
                message: response.data?.message,
                status: response.status
            })
        } else {
            const response = await positionService.updatePosition({
                id,
                props: {
                    office,
                    privillegeLevel: Number(privilegeLevel)
                }
            })

            if(!response.data && response.status !== 400) throw new Error(`${response.status} | ${ response.error.message || 'Ocorreu um erro inesperado'}`)

            if(!response.data && response.status === 400) return ({
                message: response.error.message || 'Ocorreu um erro inesperado',
                status: response.status
            })

            return ({
                message: response.data?.message,
                status: response.status
            })
        }
    } catch (error: any) {
        throw new Error(error.message || 'Ocorreu um erro inesperado')
    } finally {
        revalidatePath('/admin/positionRegisters')
    }
} 