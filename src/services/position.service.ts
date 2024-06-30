import { backend } from "../utils/backend";
import { ApiConnection } from "../utils/apiConnection";
import { cookies } from "next/headers";
import { IPosition } from "@/Entitys/Position";

interface ICreatePositionBody {
    office: string;
    privillegeLevel: number;
}

interface ICreatePositionResponse {
    message: string
}
class ApiPositionService {

    constructor(
        private api: ApiConnection
    ) {}

    async getAllPositions() {

        const authorization = cookies().get('Authorization')?.value

        return await this.api.get<{positions: IPosition[]}>('/position', {
            'Authorization': `${authorization}`
        })

    }

    async createNewPosition(position: IPosition) {

        const authorization = cookies().get('Authorization')?.value

        return await this.api.post<ICreatePositionResponse, ICreatePositionBody>('/position',  {
            office: position.props.office,
            privillegeLevel: position.props.privillegeLevel
        },{
            'Authorization': `${authorization}`
        })

    }

    async updatePosition(position: IPosition) {
        const authorization = cookies().get('Authorization')?.value

        return await this.api.put<ICreatePositionResponse, ICreatePositionBody>(`/position/${position.id}`,  {
            office: position.props.office,
            privillegeLevel: position.props.privillegeLevel
        },{
            'Authorization': `${authorization}`
        })
    }
}


export const positionService = new ApiPositionService(backend)