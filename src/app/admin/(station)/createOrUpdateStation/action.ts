"use server"

import { stationService } from "@/services/stations.service";

export interface State {
    message: string | undefined;
    status: number | undefined;
}

export const handleCreateOrUpdateStation = async (prevState: State, e: FormData): Promise<State> => {

    const id = e.get('id')?.toString()
    const name = e.get('name')?.toString()
    const cnpj = e.get('cnpj')?.toString()
    const latitudeString = e.get('latitude')?.toString()
    const longitudeString = e.get('longitude')?.toString()

    const latitude = Number(latitudeString)
    const longitude = Number(longitudeString)

    if (!name || !cnpj || !latitudeString || !longitudeString || isNaN(latitude) || isNaN(longitude)) return ({
        message: 'Preencha todos os campos',
        status: 400
    })

    console.log(id)
    console.log(name)
    console.log(cnpj)
    console.log(latitude)
    console.log(longitude)

    try {

        let response
        if (id) {
            response = await stationService.updateStation({
                id,
                name,
                cnpj,
                latitude,
                longitude
            })
        } else {
            response = await stationService.createStation({
                name,
                cnpj,
                latitude,
                longitude
            })
        }

        if (!response.data && response.status !== 400) throw new Error(`${response.status} | ${response.error.message || 'Ocorreu um erro inesperado'}`)

        if (!response.data && response.status === 400) {
            return ({
                message: response.error.message,
                status: response.status
            })
        }

        return ({
            message: response.data?.message,
            status: response.status
        })
        
    } catch (error: any) {
        throw new Error(error.message || 'Ocorreu um erro inesperado')
    }




    return ({
        message: 'Ok',
        status: 200
    })

}