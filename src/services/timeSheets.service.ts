import { cookies } from "next/headers";
import { ApiConnection, ApiResponse } from "../utils/apiConnection"
import { backend } from "../utils/backend";
import { ITimeSheet, IMonthsAndYears } from "@/Entitys/TimeSheet";


interface IUpdateTimeSheetProps {
    userId?: string | undefined,
    registeredDay: number | undefined,
    registeredMonth: number | undefined,
    registeredYear: number | undefined,

    first_entrance: number | null,
    first_exit: number | null,
    second_entrance: number | null,
    second_exit: number | null,
    medicalCertificate: boolean,
    missed: boolean

}

interface ISetMedicalCertificateProps {
    userId: string;
    startsAt: string;
    endsAt: string;  
}

interface PostAndPutApiResponse { message: string }

class ApiTimeSheetService {

    constructor(
        private readonly api: ApiConnection
    ) { }

    async getMonthsAndYears(userId?: string): Promise<ApiResponse<{ monthsAndYears: IMonthsAndYears[] }>> {

        const token = cookies().get('Authorization')?.value

        return await this.api.get<{ monthsAndYears: IMonthsAndYears[] }>(`/timesheet/monthsAndYears?userId=${userId || ''}`, {
            'Authorization': token || ''
        })
    }

    async getTimeSheetByYearAndMonth(year: number, month: number, userId?: string): Promise<ApiResponse<{ timeSheet: ITimeSheet[] }>> {

        const token = cookies().get('Authorization')?.value

        return await this.api.get<{ timeSheet: ITimeSheet[] }>(`/timeSheet?year=${year}&month=${month}&userId=${userId || ''}`, {
            'Authorization': token || ''
        })
    }

    async getLastRegister(): Promise<ApiResponse<{ lastRegister: ITimeSheet | null }>> {
        const authorization = cookies().get('Authorization')?.value

        return await this.api.get<{ lastRegister: ITimeSheet | null }>('/timeSheet/lastRegister', {
            'Authorization': `${authorization}`
        })
    }

    async updateTimeSheetByUserId(timeSheetProps: IUpdateTimeSheetProps) {

        const authorization = cookies().get('Authorization')?.value


        return await this.api.put<PostAndPutApiResponse, IUpdateTimeSheetProps>(`/timesheet/${timeSheetProps.userId}`, {
            registeredDay: timeSheetProps.registeredDay,
            registeredMonth: timeSheetProps.registeredMonth,
            registeredYear: timeSheetProps.registeredYear,

            first_entrance: timeSheetProps.first_entrance,
            first_exit: timeSheetProps.first_exit,
            second_entrance: timeSheetProps.second_entrance,
            second_exit: timeSheetProps.second_exit,
            medicalCertificate: timeSheetProps.medicalCertificate,
            missed: timeSheetProps.missed,

        }, {
            'Authorization': `${authorization}`
        })
    }

   
    async setMedicalCertificateByUserId ({ userId, startsAt, endsAt }: ISetMedicalCertificateProps) {
        const authorization = cookies().get('Authorization')?.value
        return await this.api.put<PostAndPutApiResponse, ISetMedicalCertificateProps>(`/timesheet/medicalCertificate/${userId}`, {
            startsAt,
            endsAt,
            userId
        }, {
            'Authorization': `${authorization}`
        })
    }
}


export const timeSheetService = new ApiTimeSheetService(backend)