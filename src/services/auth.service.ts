import { backend } from "../utils/backend";
import { ApiConnection } from "../utils/apiConnection";
import { cookies } from "next/headers";

class ApiAuthService {

    constructor(
        private api: ApiConnection
    ) {}

    async signin(phone: string, password: string) {
        
        return await this.api.post<{ token: string }, { phone: string, password: string }>('/signin', {
            phone,
            password
        })

    }

    async getPrivilegeLevel() {

        const authorization = cookies().get('Authorization')?.value

        return await this.api.get<{ privillegeLevel: number }>('/position/privillegeLevel', {
            'Authorization': `${authorization}`
        })

    }

    async updatePhoneAndPassword(phone: string, password: string) {

        const authorization = cookies().get('Authorization')?.value

        return await this.api.put<{ message: string }, { phone: string , password: string }>('/users', {
            phone,
            password
        }, {
            'Authorization': `${authorization}`
        })
    }
}


export const authService = new ApiAuthService(backend)