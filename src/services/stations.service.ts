import { backend } from "../utils/backend";
import { ApiConnection } from "../utils/apiConnection";
import { cookies } from "next/headers";
import { IStation } from "@/Entitys/Station";

interface ICreateOrUpdateStationBody {
    id?: string
    name: string;
    cnpj: string;
    latitude: number;
    longitude: number;
}

interface ICreateStationResponse {
    message: string;
}

class ApiStationService {

    constructor(
        private api: ApiConnection
    ) { }

    async getAllStations() {

        const authorization = cookies().get('Authorization')?.value

        return await this.api.get<{ stations: IStation[] }>('/station', {
            'Authorization': `${authorization}`
        })

    }

    async createStation({ name, cnpj, latitude, longitude }: ICreateOrUpdateStationBody) {
        const authorization = cookies().get('Authorization')?.value

        return await this.api.post<ICreateStationResponse, ICreateOrUpdateStationBody>('/station', {
            name,
            cnpj,
            latitude,
            longitude
        }, {
            'Authorization': `${authorization}`
        })

    }

    async updateStation({ id, name, cnpj, latitude, longitude }: ICreateOrUpdateStationBody) {
        const authorization = cookies().get('Authorization')?.value

        return await this.api.put<ICreateStationResponse, ICreateOrUpdateStationBody>(`/station/${id}`, {
            name,
            cnpj,
            latitude,
            longitude
        }, {
            'Authorization': `${authorization}`
        })

    }
}


export const stationService = new ApiStationService(backend)