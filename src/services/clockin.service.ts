import { cookies } from "next/headers";
import { backend } from "../utils/backend"
import { ApiConnection, ApiResponse } from '@/utils/apiConnection'
import { ITimeSheet } from "@/Entitys/TimeSheet";


interface IClockinParamsType {
    latitude: number;
    longitude: number;
}

interface IClockinResponseType {
    message: string
}

class ApiClockinService {
    private readonly api: ApiConnection

    constructor(api: typeof backend) {
        this.api = api
    }

    async clockin({ latitude, longitude }: IClockinParamsType): Promise<ApiResponse<IClockinResponseType>> {

        const authorization = cookies().get('Authorization')?.value

        return await this.api.post<IClockinResponseType, IClockinParamsType>('/timeSheet', {
            latitude,
            longitude
        }, {
            'Authorization': `${authorization}`
        })
    }

}



export const clockinService = new ApiClockinService(backend)