import { backend } from '../utils/backend'
import { ApiConnection } from '../utils/apiConnection'


import { cookies } from 'next/headers'
import { ICreateUserBody, IUser } from '@/Entitys/User'
import { IStation } from '@/Entitys/Station'
import { IPosition } from '@/Entitys/Position'



export class UserService {

    constructor(
        private api: ApiConnection
    ) {}

    async getUsers() {
        const authorization = cookies().get('Authorization')?.value

        const response = await this.api.get<{users: IUser[]}>('/users', {
            'Authorization': `${authorization}`
        })

        return response
    }

    async getUserById(userId?: string) {
        const authorization = cookies().get('Authorization')?.value

        const response = await this.api.get<{user: IUser, station: IStation, position: IPosition} | null>(`/user${userId ? `?userId=${userId}` : ''}`, {
            'Authorization': `${authorization}`
        })

        return response
    }


    async createNewUser(user: ICreateUserBody) {
        const authorization = cookies().get('Authorization')?.value

        const response = await this.api.post<{message: string}, ICreateUserBody >('/users', {
            ...user
        },{
            'Authorization': `${authorization}`
        })

        return response
    }

    async updateUser(user: ICreateUserBody) {
        const authorization = cookies().get('Authorization')?.value

        const response = await this.api.put<{message: string}, ICreateUserBody >(`/users/${user.id}`, {
            ...user
        },{
            'Authorization': `${authorization}`
        })

        return response
    }
}


export const userService = new UserService(backend)