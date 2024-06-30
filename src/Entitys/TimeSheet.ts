export interface ITimeSheet {
    id?: string;
    props: {
        userId: string;
        registeredDay: number;
        registeredMonth: number;
        registeredYear: number;
        clockin: {
            first_entrance: bigint | null;
            first_exit: bigint | null;
            second_entrance: bigint | null;
            second_exit: bigint | null;
            missed: boolean;
            medicalCertificate: boolean;
        }
    }
}

export interface IMonthsAndYears {
    year: number;
    month: number;
}